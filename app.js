const CONFIG = {
  SUPABASE_URL: "https://bhyygpbeijrxspekrixg.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_sueEe9QWbkzc0rAoBG_jtw_t_AI5dQ1",
  TEACHER_CODE: "ecosystem44",
  STORAGE_BUCKET: "generated-images",
  EDGE_FUNCTION: "generate-ecosystem-image"
};

const ECOSYSTEMS = [
  "熱帶雨林生態系",
  "溫帶落葉林生態系",
  "針葉林生態系",
  "草原生態系",
  "沙漠生態系",
  "湖泊生態系",
  "溪流生態系",
  "河口生態系",
  "近海區生態系",
  "遠洋區生態系",
  "凍原生態系",
  "台灣高山草原生態系"
];

const storageKeys = {
  session: "eco44-session",
  submissions: "eco44-submissions",
  ratings: "eco44-ratings",
  teacher: "eco44-teacher-unlocked"
};

let supabaseClient = null;
let session = null;
let submissions = [];
let ratings = [];
let generatedImage = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

document.addEventListener("DOMContentLoaded", async () => {
  fillEcosystemSelects();
  bindEvents();
  loadIconLibrary();
  await loadSupabaseLibrary();
  initSupabase();
  session = loadJson(storageKeys.session);
  updateModeBadge();
  await refreshData();
  renderSession();
  renderGallery();
  renderTeacher();
});

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function loadIconLibrary() {
  loadScript("https://unpkg.com/lucide@latest", 1800).then(initIcons).catch(() => null);
}

async function loadSupabaseLibrary() {
  if (CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY) {
    await loadScript("https://unpkg.com/@supabase/supabase-js@2", 5000).catch(() => null);
  }
}

function loadScript(src, timeout) {
  if ($(`script[src="${src}"]`)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      script.remove();
      reject(new Error(`Script timeout: ${src}`));
    }, timeout);
    script.src = src;
    script.async = true;
    script.onload = () => {
      window.clearTimeout(timer);
      resolve();
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error(`Script failed: ${src}`));
    };
    document.head.append(script);
  });
}

function initSupabase() {
  const hasConfig = CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY && window.supabase;
  if (hasConfig) {
    supabaseClient = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  }
}

function updateModeBadge() {
  const badge = $("#modeBadge");
  if (!badge) return;
  badge.textContent = supabaseClient ? "Supabase 已連線" : "示範模式";
}

function bindEvents() {
  $("#loginForm").addEventListener("submit", handleLogin);
  $("#logoutBtn").addEventListener("click", handleLogout);
  $("#submissionForm").addEventListener("submit", handleSubmission);
  $("#buildPromptBtn").addEventListener("click", buildPrompt);
  $("#generateImageBtn").addEventListener("click", handleGenerateImage);
  $("#resetFormBtn").addEventListener("click", resetSubmissionForm);
  $("#imageFile").addEventListener("change", handleImageFilePreview);
  $("#imageUrl").addEventListener("input", handleImageUrlPreview);
  $("#teacherLoginForm").addEventListener("submit", handleTeacherLogin);
  $("#exportCsvBtn").addEventListener("click", exportCsv);

  $$("input[name='groupSize']").forEach((input) => {
    input.addEventListener("change", updateGroupFields);
  });

  $$(".tab").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  ["filterEcosystem", "filterSeat", "sortWorks"].forEach((id) => {
    $(`#${id}`).addEventListener("input", renderGallery);
  });
}

function fillEcosystemSelects() {
  const options = ECOSYSTEMS.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
  $("#ecosystemType").innerHTML = `<option value="">請選擇</option>${options}`;
  $("#filterEcosystem").innerHTML = `<option value="">全部</option>${options}`;
}

function updateGroupFields() {
  const groupSize = Number($("input[name='groupSize']:checked").value);
  const memberB = $("#memberBFields");
  const inputs = $$("input", memberB);
  memberB.classList.toggle("hidden", groupSize !== 2);
  inputs.forEach((input) => {
    input.required = groupSize === 2;
    if (groupSize !== 2) input.value = "";
  });
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const groupSize = Number(data.get("groupSize"));
  const nextSession = {
    className: clean(data.get("className")),
    groupSize,
    seatA: clean(data.get("seatA")),
    nameA: clean(data.get("nameA")),
    seatB: groupSize === 2 ? clean(data.get("seatB")) : "",
    nameB: groupSize === 2 ? clean(data.get("nameB")) : "",
    ownerToken: makeId(),
    loginAt: new Date().toISOString()
  };

  if (!nextSession.className || !nextSession.seatA || !nextSession.nameA) {
    toast("請填寫班級、座號與姓名。");
    return;
  }

  if (groupSize === 2 && (!nextSession.seatB || !nextSession.nameB)) {
    toast("兩人小組需要填寫第二位同學資料。");
    return;
  }

  session = nextSession;
  saveJson(storageKeys.session, session);
  renderSession();
  toast("登入完成。");
}

function handleLogout() {
  localStorage.removeItem(storageKeys.session);
  localStorage.removeItem(storageKeys.teacher);
  session = null;
  generatedImage = null;
  renderSession();
  resetSubmissionForm();
}

function renderSession() {
  const loggedIn = Boolean(session);
  $("#loginScreen").classList.toggle("hidden", loggedIn);
  $("#appShell").classList.toggle("hidden", !loggedIn);
  if (!loggedIn) {
    updateGroupFields();
    initIcons();
    return;
  }

  $("#sessionName").textContent = displayNames(session);
  $("#sessionMeta").textContent = `${session.className} 班｜${displaySeats(session)} 號`;
  $("#teacherDashboard").classList.toggle("hidden", localStorage.getItem(storageKeys.teacher) !== "true");
  $("#teacherLock").classList.toggle("hidden", localStorage.getItem(storageKeys.teacher) === "true");
  initIcons();
}

function switchView(viewId) {
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === viewId));
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  if (viewId === "galleryView") renderGallery();
  if (viewId === "teacherView") renderTeacher();
  initIcons();
}

function buildPrompt() {
  const form = $("#submissionForm");
  const data = new FormData(form);
  const ecosystem = clean(data.get("ecosystemType"));
  if (!ecosystem) {
    toast("請先選擇生態系。");
    return;
  }

  const environment = clean(data.get("environmentNotes")) || "呈現典型地形、氣候、水分、光照與季節條件";
  const plants = clean(data.get("plantNotes")) || "包含能代表此生態系的植物與適應特徵";
  const animals = clean(data.get("animalNotes")) || "包含能代表此生態系的動物與行為特徵";
  const relationships = clean(data.get("relationshipNotes")) || "呈現食物鏈、生物互動與棲地關係";
  const style = clean(data.get("imageStyle"));

  const prompt = [
    `請生成一張「${ecosystem}」的${style}。`,
    `畫面必須清楚呈現環境特色：${environment}。`,
    `植物特色：${plants}。`,
    `動物特色：${animals}。`,
    `生物互動：${relationships}。`,
    "構圖適合學生上台報告，畫面中自然元素豐富但不要雜亂。",
    "請避免文字、標籤、浮水印、卡通人類角色與不符合此生態系的物種。"
  ].join("\n");

  $("#promptText").value = prompt;
  toast("Prompt 已組合。");
}

async function handleGenerateImage() {
  const prompt = clean($("#promptText").value);
  const ecosystem = clean($("#ecosystemType").value);
  if (!ecosystem) {
    toast("請先選擇生態系。");
    return;
  }
  if (!prompt) {
    buildPrompt();
  }

  const finalPrompt = clean($("#promptText").value);
  if (!finalPrompt) return;

  const button = $("#generateImageBtn");
  setBusy(button, true, "產生中");

  try {
    if (supabaseClient) {
      const { data, error } = await supabaseClient.functions.invoke(CONFIG.EDGE_FUNCTION, {
        body: {
          prompt: finalPrompt,
          ecosystem,
          className: session.className,
          seat: displaySeats(session)
        }
      });
      if (error) throw error;
      if (!data?.imageUrl) throw new Error("圖片生成函式沒有回傳 imageUrl。");
      generatedImage = {
        url: data.imageUrl,
        path: data.imagePath || "",
        source: "openai"
      };
      setPreviewImage(data.imageUrl, "已產生");
    } else {
      const demoUrl = await createDemoImage(ecosystem, finalPrompt);
      generatedImage = {
        url: demoUrl,
        path: "",
        source: "demo"
      };
      setPreviewImage(demoUrl, "示範圖片");
    }
    toast("圖片已產生。");
  } catch (error) {
    toast(error.message || "圖片產生失敗。");
  } finally {
    setBusy(button, false);
  }
}

async function handleImageFilePreview(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const dataUrl = await fileToDataUrl(file, 1200, 0.86);
  generatedImage = {
    url: dataUrl,
    path: "",
    source: "upload",
    file
  };
  $("#imageUrl").value = "";
  setPreviewImage(dataUrl, "已選取");
}

function handleImageUrlPreview(event) {
  const url = clean(event.target.value);
  if (!url) return;
  generatedImage = {
    url,
    path: "",
    source: "url"
  };
  $("#imageFile").value = "";
  setPreviewImage(url, "圖片網址");
}

async function handleSubmission(event) {
  event.preventDefault();
  if (!session) return;

  const form = event.currentTarget;
  const data = new FormData(form);
  const prompt = clean(data.get("prompt"));
  const ecosystem = clean(data.get("ecosystemType"));
  if (!ecosystem || !prompt) {
    toast("請確認生態系與 Prompt。");
    return;
  }
  if (!generatedImage?.url) {
    toast("請先產生、上傳或貼上圖片網址。");
    return;
  }

  const submitButton = $("button[type='submit']", form);
  setBusy(submitButton, true, "送出中");

  try {
    let imageUrl = generatedImage.url;
    let imagePath = generatedImage.path || "";

    if (supabaseClient && generatedImage.file) {
      const uploaded = await uploadImageFile(generatedImage.file);
      imageUrl = uploaded.url;
      imagePath = uploaded.path;
    }

    const submission = {
      class_name: session.className,
      group_size: session.groupSize,
      student_a_seat: session.seatA,
      student_a_name: session.nameA,
      student_b_seat: session.seatB || null,
      student_b_name: session.nameB || null,
      owner_token: session.ownerToken,
      ecosystem_type: ecosystem,
      environment_notes: clean(data.get("environmentNotes")),
      plant_notes: clean(data.get("plantNotes")),
      animal_notes: clean(data.get("animalNotes")),
      relationship_notes: clean(data.get("relationshipNotes")),
      prompt,
      image_url: imageUrl,
      image_path: imagePath,
      image_source: generatedImage.source || "unknown"
    };

    if (supabaseClient) {
      const { error } = await supabaseClient.from("submissions").insert(submission);
      if (error) throw error;
    } else {
      const localSubmission = {
        id: makeId(),
        ...submission,
        created_at: new Date().toISOString()
      };
      submissions = [localSubmission, ...submissions];
      saveJson(storageKeys.submissions, submissions);
    }

    await refreshData();
    renderGallery();
    renderTeacher();
    resetSubmissionForm();
    switchView("galleryView");
    toast("作品已送出。");
  } catch (error) {
    toast(error.message || "送出失敗。");
  } finally {
    setBusy(submitButton, false);
  }
}

async function uploadImageFile(file) {
  const safeName = file.name.replace(/[^\w.-]+/g, "-").toLowerCase();
  const path = `${session.className}/${session.ownerToken}/${Date.now()}-${safeName}`;
  const { error } = await supabaseClient.storage.from(CONFIG.STORAGE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type
  });
  if (error) throw error;

  const { data } = supabaseClient.storage.from(CONFIG.STORAGE_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

async function refreshData() {
  if (supabaseClient) {
    const [submissionsResult, ratingsResult] = await Promise.all([
      supabaseClient.from("submissions").select("*").order("created_at", { ascending: false }),
      supabaseClient.from("ratings").select("*").order("created_at", { ascending: false })
    ]);
    if (submissionsResult.error) toast(submissionsResult.error.message);
    if (ratingsResult.error) toast(ratingsResult.error.message);
    submissions = submissionsResult.data || [];
    ratings = ratingsResult.data || [];
  } else {
    submissions = loadJson(storageKeys.submissions) || [];
    ratings = loadJson(storageKeys.ratings) || [];
  }
}

function renderGallery() {
  const grid = $("#galleryGrid");
  if (!grid) return;

  const ecosystemFilter = $("#filterEcosystem").value;
  const seatFilter = clean($("#filterSeat").value);
  const sortBy = $("#sortWorks").value;
  const scored = submissions.map((submission) => ({
    ...submission,
    score: getScoreSummary(submission.id)
  }));

  const filtered = scored
    .filter((item) => !ecosystemFilter || item.ecosystem_type === ecosystemFilter)
    .filter((item) => !seatFilter || displaySubmissionSeats(item).includes(seatFilter))
    .sort((a, b) => sortSubmissions(a, b, sortBy));

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-gallery">尚無符合條件的作品</div>`;
    return;
  }

  grid.innerHTML = filtered.map(renderWorkCard).join("");
  $$(".rating-form", grid).forEach((form) => form.addEventListener("submit", handleRating));
  initIcons();
}

function renderWorkCard(item) {
  const ownWork = session && item.owner_token === session.ownerToken;
  const rated = ratings.some((rating) => rating.submission_id === item.id && rating.rater_owner_token === session?.ownerToken);
  const scoreLabel = item.score.count ? item.score.average.toFixed(1) : "-";
  const disabledReason = ownWork ? "自己的作品" : rated ? "已評分" : "";

  return `
    <article class="work-card">
      <img src="${escapeAttr(item.image_url)}" alt="${escapeAttr(item.ecosystem_type)}作品圖片" loading="lazy" />
      <div class="work-body">
        <div class="tag-row">
          <span class="tag">${escapeHtml(item.class_name)} 班</span>
          <span class="tag ocean">${escapeHtml(displaySubmissionSeats(item))} 號</span>
        </div>
        <h3>${escapeHtml(item.ecosystem_type)}</h3>
        <p>${escapeHtml(displaySubmissionNames(item))}</p>
        <div class="score-line">
          <span>平均分數</span>
          <strong>${scoreLabel}</strong>
          <span>${item.score.count} 人</span>
        </div>
        <details>
          <summary>查看 Prompt</summary>
          <p>${escapeHtml(item.prompt)}</p>
        </details>
        <form class="rating-form" data-id="${escapeAttr(item.id)}">
          <label>
            <span>分數</span>
            <select name="score" ${disabledReason ? "disabled" : ""}>
              ${Array.from({ length: 10 }, (_, index) => {
                const score = index + 1;
                return `<option value="${score}" ${score === 8 ? "selected" : ""}>${score}</option>`;
              }).join("")}
            </select>
          </label>
          <label>
            <span>優點</span>
            <textarea name="strength" rows="2" ${disabledReason ? "disabled" : ""}></textarea>
          </label>
          <label>
            <span>可以再增加的內容</span>
            <textarea name="suggestion" rows="2" ${disabledReason ? "disabled" : ""}></textarea>
          </label>
          <button class="primary-btn full" type="submit" ${disabledReason ? "disabled" : ""}>
            <i data-lucide="star"></i>
            <span>${disabledReason || "送出評分"}</span>
          </button>
        </form>
      </div>
    </article>
  `;
}

async function handleRating(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submissionId = form.dataset.id;
  const target = submissions.find((item) => item.id === submissionId);
  if (!target || !session) return;
  if (target.owner_token === session.ownerToken) {
    toast("不能評分自己的作品。");
    return;
  }
  if (ratings.some((rating) => rating.submission_id === submissionId && rating.rater_owner_token === session.ownerToken)) {
    toast("你已經評過這件作品。");
    return;
  }

  const data = new FormData(form);
  const rating = {
    submission_id: submissionId,
    rater_owner_token: session.ownerToken,
    rater_class: session.className,
    rater_seat: displaySeats(session),
    rater_name: displayNames(session),
    score: Number(data.get("score")),
    strength: clean(data.get("strength")),
    suggestion: clean(data.get("suggestion"))
  };

  if (!rating.strength && !rating.suggestion) {
    toast("請至少填寫一項回饋。");
    return;
  }

  const button = $("button[type='submit']", form);
  setBusy(button, true, "送出中");

  try {
    if (supabaseClient) {
      const { error } = await supabaseClient.from("ratings").insert(rating);
      if (error) throw error;
    } else {
      ratings = [{ id: makeId(), ...rating, created_at: new Date().toISOString() }, ...ratings];
      saveJson(storageKeys.ratings, ratings);
    }
    await refreshData();
    renderGallery();
    renderTeacher();
    toast("評分已送出。");
  } catch (error) {
    toast(error.message || "評分送出失敗。");
  } finally {
    setBusy(button, false);
  }
}

function handleTeacherLogin(event) {
  event.preventDefault();
  const code = clean(new FormData(event.currentTarget).get("teacherCode"));
  if (code !== CONFIG.TEACHER_CODE) {
    toast("後台代碼不正確。");
    return;
  }
  localStorage.setItem(storageKeys.teacher, "true");
  $("#teacherLock").classList.add("hidden");
  $("#teacherDashboard").classList.remove("hidden");
  renderTeacher();
  toast("已進入老師後台。");
}

function renderTeacher() {
  if (!$("#teacherRows")) return;
  const unlocked = localStorage.getItem(storageKeys.teacher) === "true";
  $("#teacherLock").classList.toggle("hidden", unlocked);
  $("#teacherDashboard").classList.toggle("hidden", !unlocked);
  if (!unlocked) return;

  const summaries = submissions.map((submission) => ({
    ...submission,
    score: getScoreSummary(submission.id)
  }));
  const ratedWorks = summaries.filter((item) => item.score.count > 0);
  const allRatingScores = ratings.map((rating) => Number(rating.score)).filter(Boolean);
  const classAverage = allRatingScores.length
    ? (allRatingScores.reduce((sum, score) => sum + score, 0) / allRatingScores.length).toFixed(1)
    : "-";

  $("#statSubmissions").textContent = summaries.length;
  $("#statRated").textContent = ratedWorks.length;
  $("#statAverage").textContent = classAverage;
  $("#statRatings").textContent = ratings.length;

  $("#teacherRows").innerHTML = summaries
    .sort((a, b) => sortSeat(a.student_a_seat) - sortSeat(b.student_a_seat))
    .map((item) => `
      <tr>
        <td>${escapeHtml(item.class_name)}</td>
        <td>${escapeHtml(displaySubmissionSeats(item))}</td>
        <td>${escapeHtml(displaySubmissionNames(item))}</td>
        <td>${escapeHtml(item.ecosystem_type)}</td>
        <td>${item.score.count ? item.score.average.toFixed(1) : "-"}</td>
        <td>${item.score.count}</td>
        <td>${formatDate(item.created_at)}</td>
        <td><a href="${escapeAttr(item.image_url)}" target="_blank" rel="noreferrer">開啟</a></td>
      </tr>
    `)
    .join("");

  const commentHtml = ratings.length
    ? ratings.map((rating) => {
      const work = submissions.find((submission) => submission.id === rating.submission_id);
      return `
        <div class="comment-item">
          <strong>${escapeHtml(rating.score)} 分｜${escapeHtml(rating.rater_seat)} 號 ${escapeHtml(rating.rater_name)}</strong>
          <p>${escapeHtml(work?.ecosystem_type || "作品")}｜${escapeHtml(displaySubmissionNames(work || {}))}</p>
          <p>優點：${escapeHtml(rating.strength || "-")}</p>
          <p>可增加：${escapeHtml(rating.suggestion || "-")}</p>
        </div>
      `;
    }).join("")
    : `<div class="comment-item"><p>尚無評分回饋。</p></div>`;

  $("#teacherComments").innerHTML = commentHtml;
}

function exportCsv() {
  const header = ["班級", "座號", "姓名", "生態系", "Prompt", "圖片網址", "平均分數", "評分人數", "繳交時間"];
  const rows = submissions.map((item) => {
    const summary = getScoreSummary(item.id);
    return [
      item.class_name,
      displaySubmissionSeats(item),
      displaySubmissionNames(item),
      item.ecosystem_type,
      item.prompt,
      item.image_url,
      summary.count ? summary.average.toFixed(1) : "",
      summary.count,
      formatDate(item.created_at)
    ];
  });
  const csv = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ecosystem-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function resetSubmissionForm() {
  $("#submissionForm").reset();
  generatedImage = null;
  setPreviewImage("", "尚未產生");
}

function setPreviewImage(url, status) {
  const img = $("#previewImage");
  const stage = $("#imageStage");
  img.src = url || "";
  stage.classList.toggle("has-image", Boolean(url));
  $("#imageStatus").textContent = status;
}

function getScoreSummary(submissionId) {
  const list = ratings.filter((rating) => rating.submission_id === submissionId);
  const count = list.length;
  const average = count ? list.reduce((sum, rating) => sum + Number(rating.score), 0) / count : 0;
  return { count, average };
}

function sortSubmissions(a, b, sortBy) {
  if (sortBy === "seat") return sortSeat(a.student_a_seat) - sortSeat(b.student_a_seat);
  if (sortBy === "ecosystem") return a.ecosystem_type.localeCompare(b.ecosystem_type, "zh-Hant");
  if (sortBy === "score") return b.score.average - a.score.average;
  return new Date(b.created_at || 0) - new Date(a.created_at || 0);
}

async function createDemoImage(ecosystem, prompt) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");
  const palette = getPalette(ecosystem);

  const sky = ctx.createLinearGradient(0, 0, 0, 560);
  sky.addColorStop(0, palette.sky);
  sky.addColorStop(1, palette.haze);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSun(ctx, palette.sun);
  drawClouds(ctx, palette.cloud);

  if (ecosystem.includes("海") || ecosystem.includes("洋") || ecosystem.includes("湖") || ecosystem.includes("溪") || ecosystem.includes("河口")) {
    drawWaterScene(ctx, ecosystem, palette);
  } else if (ecosystem.includes("沙漠")) {
    drawDesertScene(ctx, palette);
  } else if (ecosystem.includes("凍原") || ecosystem.includes("高山")) {
    drawAlpineScene(ctx, palette);
  } else if (ecosystem.includes("草原")) {
    drawGrasslandScene(ctx, palette);
  } else {
    drawForestScene(ctx, ecosystem, palette);
  }

  drawForegroundDetails(ctx, ecosystem, palette, prompt);
  return canvas.toDataURL("image/jpeg", 0.88);
}

function getPalette(ecosystem) {
  if (ecosystem.includes("沙漠")) {
    return { sky: "#9ed3e8", haze: "#f3dc9f", land: "#d79a42", land2: "#b87932", leaf: "#77733d", dark: "#5b4a2e", water: "#4a9fba", sun: "#f3c05d", cloud: "rgba(255,255,255,0.75)" };
  }
  if (ecosystem.includes("海") || ecosystem.includes("洋") || ecosystem.includes("湖") || ecosystem.includes("溪") || ecosystem.includes("河口")) {
    return { sky: "#88cde0", haze: "#d9f2ec", land: "#6c9b58", land2: "#2f7160", leaf: "#2f7b55", dark: "#174253", water: "#1f78a2", sun: "#f2bd5b", cloud: "rgba(255,255,255,0.72)" };
  }
  if (ecosystem.includes("凍原") || ecosystem.includes("高山")) {
    return { sky: "#8fc7df", haze: "#e5eef0", land: "#9aa982", land2: "#667a6c", leaf: "#6e8f59", dark: "#344d4e", water: "#3d8faf", sun: "#f0c96d", cloud: "rgba(255,255,255,0.78)" };
  }
  if (ecosystem.includes("落葉")) {
    return { sky: "#9bc9dc", haze: "#f1d7a6", land: "#8da152", land2: "#b77645", leaf: "#b65f3d", dark: "#3d4028", water: "#357f9a", sun: "#e7a94f", cloud: "rgba(255,255,255,0.7)" };
  }
  return { sky: "#80c9d5", haze: "#dcefd8", land: "#4f9852", land2: "#2f6d48", leaf: "#247547", dark: "#163e34", water: "#2d8aa6", sun: "#eebd54", cloud: "rgba(255,255,255,0.72)" };
}

function drawSun(ctx, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(980, 145, 56, 0, Math.PI * 2);
  ctx.fill();
}

function drawClouds(ctx, color) {
  ctx.fillStyle = color;
  [
    [170, 120, 1],
    [500, 90, 0.7],
    [830, 205, 0.8]
  ].forEach(([x, y, scale]) => {
    ctx.beginPath();
    ctx.ellipse(x, y, 72 * scale, 28 * scale, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 52 * scale, y + 8 * scale, 56 * scale, 24 * scale, 0, 0, Math.PI * 2);
    ctx.ellipse(x - 48 * scale, y + 10 * scale, 48 * scale, 20 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawForestScene(ctx, ecosystem, palette) {
  drawHills(ctx, palette.land2, palette.land, 520);
  const count = ecosystem.includes("雨林") ? 18 : ecosystem.includes("針葉") ? 14 : 12;
  for (let i = 0; i < count; i += 1) {
    const x = 40 + i * (1120 / count) + (i % 2) * 22;
    const y = 430 + (i % 4) * 20;
    ecosystem.includes("針葉") ? drawPine(ctx, x, y, 1.25, palette) : drawBroadleaf(ctx, x, y, 1.1, palette);
  }
  drawGround(ctx, palette.land, palette.land2);
}

function drawGrasslandScene(ctx, palette) {
  drawHills(ctx, "#8ca44e", "#c8b257", 560);
  drawGround(ctx, "#9db94f", "#6d8d3e");
  for (let i = 0; i < 90; i += 1) {
    const x = Math.random() * 1200;
    const y = 650 + Math.random() * 210;
    ctx.strokeStyle = i % 3 ? "#456d37" : "#d9c36a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + 28);
    ctx.quadraticCurveTo(x + 8, y + 10, x + 2, y);
    ctx.stroke();
  }
}

function drawDesertScene(ctx, palette) {
  drawHills(ctx, "#d9a04c", "#e9be67", 560);
  drawGround(ctx, palette.land, palette.land2);
  for (let i = 0; i < 5; i += 1) {
    drawCactus(ctx, 120 + i * 210, 610 + (i % 2) * 40, 0.9 + i * 0.05, palette);
  }
}

function drawAlpineScene(ctx, palette) {
  ctx.fillStyle = "#667a6c";
  ctx.beginPath();
  ctx.moveTo(0, 620);
  ctx.lineTo(210, 280);
  ctx.lineTo(410, 620);
  ctx.lineTo(560, 330);
  ctx.lineTo(790, 620);
  ctx.lineTo(980, 300);
  ctx.lineTo(1200, 620);
  ctx.lineTo(1200, 900);
  ctx.lineTo(0, 900);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#eef2ef";
  [[210, 280], [560, 330], [980, 300]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 72, y + 116);
    ctx.lineTo(x + 72, y + 116);
    ctx.closePath();
    ctx.fill();
  });
  drawGround(ctx, palette.land, palette.land2);
}

function drawWaterScene(ctx, ecosystem, palette) {
  drawHills(ctx, palette.land2, palette.land, 505);
  const waterY = ecosystem.includes("溪") ? 585 : ecosystem.includes("湖") ? 540 : 490;
  ctx.fillStyle = palette.water;
  ctx.fillRect(0, waterY, 1200, 900 - waterY);
  for (let i = 0; i < 18; i += 1) {
    ctx.strokeStyle = i % 2 ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.18)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(40 + i * 70, waterY + 70 + (i % 4) * 42);
    ctx.bezierCurveTo(92 + i * 70, waterY + 54, 120 + i * 70, waterY + 90, 180 + i * 70, waterY + 70);
    ctx.stroke();
  }
  if (ecosystem.includes("河口")) {
    ctx.fillStyle = "rgba(225, 184, 92, 0.9)";
    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.bezierCurveTo(220, 560, 340, 610, 470, 900);
    ctx.lineTo(0, 900);
    ctx.closePath();
    ctx.fill();
  }
  drawReeds(ctx, palette);
}

function drawForegroundDetails(ctx, ecosystem, palette) {
  if (ecosystem.includes("海") || ecosystem.includes("洋")) {
    drawFish(ctx, 740, 690, 1.1, "#f0c35f");
    drawFish(ctx, 570, 760, 0.85, "#e97863");
    drawFish(ctx, 910, 805, 0.75, "#cde7e2");
    return;
  }
  if (ecosystem.includes("湖") || ecosystem.includes("溪") || ecosystem.includes("河口")) {
    drawBird(ctx, 790, 350, 1, palette.dark);
    drawReeds(ctx, palette);
    return;
  }
  if (ecosystem.includes("沙漠")) {
    drawLizard(ctx, 790, 760, palette.dark);
    return;
  }
  drawBird(ctx, 790, 310, 0.9, palette.dark);
  drawBird(ctx, 900, 370, 0.65, palette.dark);
}

function drawHills(ctx, back, front, baseY) {
  ctx.fillStyle = back;
  ctx.beginPath();
  ctx.moveTo(0, baseY);
  ctx.bezierCurveTo(240, 420, 360, 470, 560, baseY - 70);
  ctx.bezierCurveTo(790, 430, 940, 470, 1200, baseY - 90);
  ctx.lineTo(1200, 900);
  ctx.lineTo(0, 900);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = front;
  ctx.beginPath();
  ctx.moveTo(0, baseY + 70);
  ctx.bezierCurveTo(300, baseY - 70, 500, baseY + 40, 760, baseY - 30);
  ctx.bezierCurveTo(930, baseY - 75, 1060, baseY - 20, 1200, baseY - 60);
  ctx.lineTo(1200, 900);
  ctx.lineTo(0, 900);
  ctx.closePath();
  ctx.fill();
}

function drawGround(ctx, colorA, colorB) {
  const ground = ctx.createLinearGradient(0, 620, 0, 900);
  ground.addColorStop(0, colorA);
  ground.addColorStop(1, colorB);
  ctx.fillStyle = ground;
  ctx.fillRect(0, 620, 1200, 280);
}

function drawPine(ctx, x, y, scale, palette) {
  ctx.fillStyle = "#5d3f2e";
  ctx.fillRect(x - 9 * scale, y + 88 * scale, 18 * scale, 95 * scale);
  ctx.fillStyle = palette.dark;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.moveTo(x, y + i * 34 * scale);
    ctx.lineTo(x - 62 * scale + i * 9 * scale, y + 98 * scale + i * 18 * scale);
    ctx.lineTo(x + 62 * scale - i * 9 * scale, y + 98 * scale + i * 18 * scale);
    ctx.closePath();
    ctx.fill();
  }
}

function drawBroadleaf(ctx, x, y, scale, palette) {
  ctx.fillStyle = "#69452d";
  ctx.fillRect(x - 10 * scale, y + 90 * scale, 20 * scale, 115 * scale);
  ctx.fillStyle = palette.leaf;
  ctx.beginPath();
  ctx.ellipse(x, y + 80 * scale, 74 * scale, 68 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x - 42 * scale, y + 112 * scale, 52 * scale, 42 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 42 * scale, y + 112 * scale, 52 * scale, 42 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawCactus(ctx, x, y, scale, palette) {
  ctx.strokeStyle = palette.leaf;
  ctx.lineWidth = 22 * scale;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 120 * scale);
  ctx.lineTo(x, y);
  ctx.moveTo(x, y + 70 * scale);
  ctx.lineTo(x - 42 * scale, y + 70 * scale);
  ctx.lineTo(x - 42 * scale, y + 32 * scale);
  ctx.moveTo(x, y + 92 * scale);
  ctx.lineTo(x + 46 * scale, y + 92 * scale);
  ctx.lineTo(x + 46 * scale, y + 48 * scale);
  ctx.stroke();
  ctx.lineWidth = 2;
}

function drawReeds(ctx, palette) {
  for (let i = 0; i < 24; i += 1) {
    const x = 22 + i * 48;
    const y = 650 + (i % 3) * 24;
    ctx.strokeStyle = palette.dark;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, 900);
    ctx.quadraticCurveTo(x - 18, y + 90, x, y);
    ctx.stroke();
    ctx.fillStyle = "#7a5731";
    ctx.beginPath();
    ctx.ellipse(x, y - 14, 8, 24, -0.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBird(ctx, x, y, scale, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 5 * scale;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - 42 * scale, y);
  ctx.quadraticCurveTo(x - 15 * scale, y - 22 * scale, x, y);
  ctx.quadraticCurveTo(x + 20 * scale, y - 24 * scale, x + 48 * scale, y);
  ctx.stroke();
}

function drawFish(ctx, x, y, scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 46 * scale, 22 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - 44 * scale, y);
  ctx.lineTo(x - 82 * scale, y - 26 * scale);
  ctx.lineTo(x - 82 * scale, y + 26 * scale);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#17313a";
  ctx.beginPath();
  ctx.arc(x + 24 * scale, y - 5 * scale, 4 * scale, 0, Math.PI * 2);
  ctx.fill();
}

function drawLizard(ctx, x, y, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(x, y, 54, 16, 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - 52, y);
  ctx.quadraticCurveTo(x - 112, y - 22, x - 150, y + 16);
  ctx.moveTo(x - 8, y + 12);
  ctx.lineTo(x - 34, y + 40);
  ctx.moveTo(x + 22, y + 10);
  ctx.lineTo(x + 52, y + 34);
  ctx.stroke();
}

function fileToDataUrl(file, maxSize, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("圖片讀取失敗。"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("圖片格式無法讀取。"));
      img.onload = () => {
        const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function loadJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function displayNames(value) {
  if (!value) return "";
  return [value.nameA || value.student_a_name, value.nameB || value.student_b_name].filter(Boolean).join("、");
}

function displaySeats(value) {
  if (!value) return "";
  return [value.seatA || value.student_a_seat, value.seatB || value.student_b_seat].filter(Boolean).join("、");
}

function displaySubmissionNames(item) {
  return [item.student_a_name, item.student_b_name].filter(Boolean).join("、");
}

function displaySubmissionSeats(item) {
  return [item.student_a_seat, item.student_b_seat].filter(Boolean).join("、");
}

function sortSeat(value) {
  const number = Number(String(value || "").match(/\d+/)?.[0] || 9999);
  return Number.isFinite(number) ? number : 9999;
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function setBusy(button, busy, label) {
  if (!button) return;
  if (busy) {
    button.dataset.original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `<span>${label || "處理中"}</span>`;
  } else {
    button.disabled = false;
    if (button.dataset.original) {
      button.innerHTML = button.dataset.original;
      delete button.dataset.original;
      initIcons();
    }
  }
}

function clean(value) {
  return String(value || "").trim();
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function makeId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  globalThis.crypto?.getRandomValues?.(bytes);
  if (bytes.some(Boolean)) {
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    return [...bytes].map((byte, index) => {
      const hex = byte.toString(16).padStart(2, "0");
      return [4, 6, 8, 10].includes(index) ? `-${hex}` : hex;
    }).join("");
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => element.classList.remove("show"), 2800);
}
