const CONFIG = {
  SUPABASE_URL: "https://bhyygpbeijrxspekrixg.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_sueEe9QWbkzc0rAoBG_jtw_t_AI5dQ1",
  TEACHER_CODE: "22725015",
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

const ECOSYSTEM_DRAFTS = {
  "熱帶雨林生態系": {
    environment: "全年高溫多雨，樹冠層、林下層與地表層明顯，濕度高、分解快，光線由上層到下層逐漸減弱。",
    plants: "植物以常綠闊葉樹、藤本植物、附生植物與蕨類為主，為了爭取光線常有高大樹冠、板根、滴水葉尖與攀爬構造。",
    animals: "草食：樹懶、貘、吼猴。肉食/食蟲：美洲豹、蟒蛇、樹蛙。雜食：捲尾猴、巨嘴鳥。無脊椎：切葉蟻、蝴蝶、甲蟲、蜘蛛。",
    relationships: "1. 蜜蜂、蝴蝶與鳥類幫開花植物授粉。\n2. 猴類、鳥類吃果實後散播種子。\n3. 美洲豹捕食貘或猴類，形成掠食關係。\n4. 真菌與細菌分解落葉，讓養分回到土壤。"
  },
  "溫帶落葉林生態系": {
    environment: "四季分明，春夏溫暖潮濕、秋季落葉、冬季寒冷，林下光照會隨季節變化，土壤腐植質較豐富。",
    plants: "植物以橡樹、楓樹、山毛櫸等落葉闊葉樹為主，春季快速展葉，秋冬落葉可減少水分散失並形成腐植層。",
    animals: "草食：白尾鹿、野兔、松鼠。肉食/食蟲：狐狸、貓頭鷹、蛇。雜食：浣熊、黑熊、野豬。無脊椎：蚯蚓、蝸牛、螞蟻、甲蟲。",
    relationships: "1. 松鼠取食堅果並儲藏，部分種子能發芽。\n2. 狐狸、貓頭鷹捕食小型哺乳類。\n3. 蚯蚓與真菌分解落葉，增加土壤養分。\n4. 鹿取食幼苗，影響森林更新。"
  },
  "針葉林生態系": {
    environment: "多位於高緯或高海拔地區，冬季漫長寒冷、夏季短暫，降水常以雪出現，土壤酸性且分解速度較慢。",
    plants: "植物以松、杉、冷杉、雲杉等針葉樹為主，針狀葉與蠟質表皮能減少水分散失，圓錐形樹冠有助積雪滑落。",
    animals: "草食：駝鹿、馴鹿、雪兔。肉食/食蟲：灰狼、猞猁、貓頭鷹、啄木鳥。雜食：棕熊、松鼠。無脊椎：天牛、蚊、蛾、蜘蛛。",
    relationships: "1. 灰狼捕食鹿科動物，調節草食動物數量。\n2. 啄木鳥取食樹幹昆蟲，也提供樹洞給其他動物。\n3. 菌根真菌協助針葉樹吸收養分。\n4. 松鼠取食與藏放松子，可能幫助種子散播。"
  },
  "草原生態系": {
    environment: "降雨量中等到偏少，乾濕季明顯，開闊少樹，火災與大型草食動物啃食常維持草本植物優勢。",
    plants: "植物以禾本科草類與耐旱草本為主，根系深且再生力強，可在乾旱、火災或啃食後快速長回來。",
    animals: "草食：斑馬、羚羊、野牛、草原犬鼠。肉食/食蟲：獅子、獵豹、鬣狗、蛇。雜食：狒狒、疣豬。無脊椎：蚱蜢、白蟻、螞蟻、糞金龜。",
    relationships: "1. 獅子、獵豹捕食羚羊或斑馬。\n2. 糞金龜分解大型草食動物糞便，促進養分循環。\n3. 白蟻改變土壤通氣與水分，影響植物分布。\n4. 草食動物啃食草類，促進嫩葉再生。"
  },
  "沙漠生態系": {
    environment: "降雨稀少、蒸發旺盛，日夜溫差大，土壤含水量低，生物多具有耐旱、夜行或儲水適應。",
    plants: "植物以仙人掌、多肉植物、灌木與短命草本為主，常有厚莖儲水、刺狀葉、深根或短時間開花結種子的特徵。",
    animals: "草食：駱駝、沙漠兔、袋鼠鼠。肉食/食蟲：狐狸、響尾蛇、蠍子、蜥蜴。雜食：渡鴉、郊狼。無脊椎：甲蟲、螞蟻、蠍子、蜘蛛。",
    relationships: "1. 仙人掌花吸引昆蟲或蝙蝠授粉。\n2. 蛇與狐狸捕食鼠類，控制小型草食動物數量。\n3. 甲蟲取食枯枝落葉，參與分解。\n4. 動物多在夜間活動，降低與高溫環境的衝突。"
  },
  "湖泊生態系": {
    environment: "靜水環境具有岸邊、表水層與深水層，光照與溶氧會隨深度改變，營養鹽影響藻類與水生植物生長。",
    plants: "植物包含浮游藻類、沉水植物、浮葉植物與挺水植物，能提供氧氣、遮蔽、產卵場所與水生食物網的基礎。",
    animals: "草食：田螺、蝌蚪、草魚。肉食/食蟲：鱸魚、蜻蜓若蟲、水蛇、翠鳥。雜食：鯽魚、鴨。無脊椎：水蚤、蜻蜓若蟲、搖蚊幼蟲、淡水蝦。",
    relationships: "1. 浮游藻類被水蚤取食，水蚤再被魚類捕食。\n2. 水草提供魚蝦躲藏與產卵場所。\n3. 翠鳥或水蛇捕食小魚與蛙類。\n4. 細菌分解沉積有機物，影響水中養分。"
  },
  "溪流生態系": {
    environment: "水流持續流動，含氧量高，水溫較穩定但受上游植被與降雨影響，石塊、急流與淺灘形成多樣微棲地。",
    plants: "植物包含附著藻類、苔蘚、河岸草本與水邊灌木，根系可穩定河岸，落葉也提供水中生物能量來源。",
    animals: "草食：螺類、水生昆蟲幼蟲。肉食/食蟲：溪哥、石斑魚、蛙、蜻蜓若蟲。雜食：溪蝦、蟹。無脊椎：石蠅若蟲、蜉蝣若蟲、水黽、螺。",
    relationships: "1. 附著藻類被螺類與水生昆蟲刮食。\n2. 魚類、蛙類捕食水生昆蟲與溪蝦。\n3. 河岸落葉被碎食者分解，進入溪流食物網。\n4. 河岸植物根系減少土壤沖刷，維持水質。"
  },
  "河口生態系": {
    environment: "淡水與海水交會，鹽度變化大，潮汐帶來營養鹽與沉積物，泥灘、紅樹林或鹽沼提供高生產力棲地。",
    plants: "植物以紅樹林、鹽生草本與浮游藻類為主，能忍受鹽分與缺氧泥地，根系可攔截沉積物並提供幼魚庇護。",
    animals: "草食：招潮蟹、螺類、魚類幼苗。肉食/食蟲：彈塗魚、鷺鷥、鷸鴴、水蛇。雜食：螃蟹、蝦虎魚。無脊椎：牡蠣、藤壺、多毛類、蝦。",
    relationships: "1. 紅樹林落葉被蟹類與微生物分解，供應碎屑食物鏈。\n2. 鷺鷥與鷸鴴捕食魚蝦、螃蟹和多毛類。\n3. 牡蠣濾食浮游生物，改善局部水質。\n4. 河口作為幼魚避敵與成長場所。"
  },
  "近海區生態系": {
    environment: "靠近陸地且光照可達，營養鹽較多，常有潮間帶、礁岩、海草床或珊瑚礁，是高生產力海域。",
    plants: "生產者以大型海藻、海草與浮游藻類為主，能行光合作用，為魚類、貝類與無脊椎動物提供食物和棲身空間。",
    animals: "草食：海膽、鸚哥魚、綠蠵龜。肉食/食蟲：石斑魚、章魚、海星、海鳥。雜食：雀鯛、螃蟹。無脊椎：珊瑚、海葵、蝦、貝類。",
    relationships: "1. 珊瑚與共生藻互利，共生藻提供能量。\n2. 海膽啃食海藻，影響礁岩表面空間。\n3. 石斑魚捕食小魚與甲殼類。\n4. 海草床提供幼魚與蝦蟹躲藏。"
  },
  "遠洋區生態系": {
    environment: "遠離海岸、海水深廣，表層有光照與浮游生物，深層黑暗且壓力大，生物常需長距離移動尋找食物。",
    plants: "遠洋區沒有大型陸生植物，主要生產者是浮游藻類與藍綠菌，牠們在表層光合作用，是海洋食物網起點。",
    animals: "草食：磷蝦、橈足類。肉食/食蟲：鮪魚、旗魚、魷魚、鯊魚、海豚。雜食：飛魚、海龜。無脊椎：水母、翼足螺、魷魚、浮游甲殼類。",
    relationships: "1. 浮游藻類被橈足類與磷蝦取食。\n2. 鮪魚、旗魚追捕小魚與魷魚。\n3. 鯊魚與海豚位於較高消費階層。\n4. 死亡生物下沉形成海雪，供深海生物利用。"
  },
  "凍原生態系": {
    environment: "氣候寒冷、夏季短、永久凍土常見，生長季很短，風強且土壤排水受限，植物低矮貼近地面。",
    plants: "植物以苔蘚、地衣、莎草、矮灌木與短命花草為主，低矮生長可避風保溫，快速開花結種以利用短暫夏季。",
    animals: "草食：馴鹿、麝牛、旅鼠、北極兔。肉食/食蟲：北極狐、雪鴞、北極狼。雜食：棕熊、渡鴉。無脊椎：蚊、蠅、甲蟲、蜘蛛。",
    relationships: "1. 馴鹿取食地衣與草本，影響植物覆蓋。\n2. 雪鴞與北極狐捕食旅鼠。\n3. 夏季大量昆蟲提供鳥類繁殖期食物。\n4. 苔蘚與地衣覆蓋地表，減緩土壤溫度變化。"
  },
  "台灣高山草原生態系": {
    environment: "多在台灣高海拔稜線或山坡，低溫、強風、日夜溫差大，冬季可能降雪，土壤薄且水分保存不易。",
    plants: "植物以玉山箭竹、高山芒、短草與低矮灌木為主，常貼近地面生長，能耐強風、低溫與短暫生長季。",
    animals: "草食：臺灣水鹿、臺灣野山羊。肉食/食蟲：黃喉貂、臺灣小黃鼠狼、雪山草蜥、山椒魚。雜食：臺灣黑熊、白耳畫眉、金翼白眉。無脊椎：高山蝴蝶、蝗蟲、蜘蛛、甲蟲。",
    relationships: "1. 臺灣水鹿取食箭竹嫩葉，影響草原植物高度。\n2. 白耳畫眉、金翼白眉取食果實或昆蟲並可能散播種子。\n3. 黃喉貂捕食小型哺乳類或鳥類，形成掠食關係。\n4. 昆蟲與微生物分解枯草，讓養分回到土壤。"
  }
};

const SIMILARITY_STOP_TOKENS = new Set([
  "植物",
  "動物",
  "生物",
  "生態",
  "生態系",
  "環境",
  "特色",
  "主要",
  "包含",
  "形成",
  "提供",
  "影響",
  "草食",
  "肉食",
  "雜食",
  "無脊",
  "椎動",
  "物動",
  "食蟲",
  "分解",
  "關係",
  "食物",
  "食物鏈",
  "取食",
  "可在",
  "常有",
  "為主",
  "以及",
  "例如"
]);

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
  ensureTeacherFilterControl();
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
  updateDraftAccess();
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
  $("#ecosystemType").addEventListener("change", handleEcosystemChange);
  $("#showDraftBtn").addEventListener("click", showEcosystemDraft);
  $("#hideDraftBtn").addEventListener("click", hideDraftPanel);
  $("#buildPromptBtn").addEventListener("click", buildPrompt);
  $("#copyPromptBtn").addEventListener("click", copyPrompt);
  $("#resetFormBtn").addEventListener("click", resetSubmissionForm);
  $("#imageFile").addEventListener("change", handleImageFilePreview);
  $("#teacherLoginForm").addEventListener("submit", handleTeacherLogin);
  $("#exportCsvBtn").addEventListener("click", exportCsv);
  $("#teacherFilterClass")?.addEventListener("input", renderTeacher);
  $("#presentationCloseBtn").addEventListener("click", closePresentation);
  $("#presentationModal").addEventListener("click", (event) => {
    if (event.target.id === "presentationModal") closePresentation();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePresentation();
  });

  $$("input[name='groupSize']").forEach((input) => {
    input.addEventListener("change", updateGroupFields);
    input.closest("label")?.addEventListener("click", () => window.setTimeout(updateGroupFields, 0));
  });

  $$(".tab").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  ["filterClass", "filterEcosystem", "filterSeat", "sortWorks"].forEach((id) => {
    $(`#${id}`).addEventListener("input", renderGallery);
  });

  ["environmentNotes", "plantNotes", "animalNotes", "relationshipNotes"].forEach((name) => {
    $(`[name="${name}"]`).addEventListener("input", () => {
      updateDraftAccess();
      $("#externalAiNotice").classList.add("hidden");
    });
  });
}

function fillEcosystemSelects() {
  const options = ECOSYSTEMS.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
  $("#ecosystemType").innerHTML = `<option value="">請選擇</option>${options}`;
  $("#filterEcosystem").innerHTML = `<option value="">全部</option>${options}`;
  $("#filterClass").innerHTML = `<option value="">全部</option>`;
  $("#teacherFilterClass").innerHTML = `<option value="">全部班級</option>`;
}

function ensureTeacherFilterControl() {
  if ($("#teacherFilterClass")) return;
  const statGrid = $(".stat-grid");
  const dashboard = $("#teacherDashboard");
  if (!statGrid || !dashboard) return;

  const panel = document.createElement("div");
  panel.className = "teacher-filter-panel";
  panel.innerHTML = `
    <label class="teacher-class-filter">
      <span>班級篩選</span>
      <select id="teacherFilterClass">
        <option value="">全部班級</option>
      </select>
    </label>
    <p>選擇班級後，下方統計、作品清單、同儕回饋與 CSV 匯出都會只顯示該班資料。</p>
  `;
  dashboard.insertBefore(panel, statGrid);
}

function updateGroupFields() {
  const groupSize = Number($("input[name='groupSize']:checked").value);
  $("#loginForm").dataset.groupSize = String(groupSize);
  const memberB = $("#memberBFields");
  const inputs = $$("input", memberB);
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

  const environment = clean(data.get("environmentNotes"));
  const plants = clean(data.get("plantNotes"));
  const animals = clean(data.get("animalNotes"));
  const relationships = clean(data.get("relationshipNotes"));
  const style = clean(data.get("imageStyle"));
  if (!environment || !plants || !animals || !relationships) {
    toast("請先完成環境、植物、動物與生物互動四欄，再組合 Prompt。");
    return;
  }

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
  $("#externalAiNotice").classList.remove("hidden");
  initIcons();
  toast("Prompt 已組合。");
}

function handleEcosystemChange() {
  ["environmentNotes", "plantNotes", "animalNotes", "relationshipNotes"].forEach((name) => {
    const field = $(`[name="${name}"]`);
    if (field) field.value = "";
  });
  $("#promptText").value = "";
  $("#externalAiNotice").classList.add("hidden");
  resetDraftPanel();
  updateDraftAccess();
}

function updateDraftAccess() {
  const ready = hasStudentDraftInputs();
  $("#showDraftBtn").classList.toggle("hidden", !ready);
  $("#draftStatus").textContent = ready ? "可查看內建草案" : "先完成自己的資料";
  if (!ready) {
    $("#draftPanel").classList.add("hidden");
  }
}

function hasStudentDraftInputs() {
  if (!clean($("#ecosystemType")?.value)) return false;
  return ["environmentNotes", "plantNotes", "animalNotes", "relationshipNotes"]
    .every((name) => clean($(`[name="${name}"]`)?.value));
}

function showEcosystemDraft() {
  const ecosystem = clean($("#ecosystemType").value);
  const draft = ECOSYSTEM_DRAFTS[ecosystem];
  if (!hasStudentDraftInputs()) {
    toast("請先自行完成環境、植物、動物與生物互動四欄，再查看內建草案。");
    updateDraftAccess();
    return;
  }
  if (!draft) {
    $("#draftStatus").textContent = "沒有草案";
    $("#draftPanel").classList.add("hidden");
    toast("請先選擇生態系。");
    return;
  }

  $("#draftEnvironment").textContent = draft.environment;
  $("#draftPlants").textContent = draft.plants;
  $("#draftAnimals").textContent = draft.animals;
  $("#draftRelationships").textContent = draft.relationships;
  $("#draftPanel").classList.remove("hidden");
  $("#draftStatus").textContent = "已顯示草案";
  initIcons();
}

function hideDraftPanel() {
  $("#draftPanel").classList.add("hidden");
  $("#draftStatus").textContent = "尚未查看草案";
}

function resetDraftPanel() {
  $("#draftPanel").classList.add("hidden");
  $("#showDraftBtn").classList.add("hidden");
  $("#draftStatus").textContent = "先完成自己的資料";
}

async function copyPrompt() {
  if (!clean($("#promptText").value)) {
    buildPrompt();
  }
  const prompt = clean($("#promptText").value);
  if (!prompt) return;

  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(prompt);
    } else {
      $("#promptText").focus();
      $("#promptText").select();
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();
    }
    toast("Prompt 已複製。");
  } catch {
    toast("無法自動複製，請手動選取 Prompt。");
  }
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
      if (error) await throwFunctionError(error);
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
  setPreviewImage(dataUrl, "已選取");
}

async function handleSubmission(event) {
  event.preventDefault();
  if (!session) return;

  const form = event.currentTarget;
  const data = new FormData(form);
  const prompt = clean(data.get("prompt"));
  const ecosystem = clean(data.get("ecosystemType"));
  const environment = clean(data.get("environmentNotes"));
  const plants = clean(data.get("plantNotes"));
  const animals = clean(data.get("animalNotes"));
  const relationships = clean(data.get("relationshipNotes"));
  if (!ecosystem || !prompt) {
    toast("請確認生態系與 Prompt。");
    return;
  }
  if (!environment || !plants || !animals || !relationships) {
    toast("請先完成環境、植物、動物與生物互動四欄。");
    return;
  }
  if (!generatedImage?.url) {
    toast("請先上傳圖片。");
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
      environment_notes: environment,
      plant_notes: plants,
      animal_notes: animals,
      relationship_notes: relationships,
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
  updateClassFilterOptions();
  updateTeacherClassFilterOptions();
}

function renderGallery() {
  const grid = $("#galleryGrid");
  if (!grid) return;

  updateClassFilterOptions();
  const classFilter = $("#filterClass").value;
  const ecosystemFilter = $("#filterEcosystem").value;
  const seatFilter = clean($("#filterSeat").value);
  const sortBy = $("#sortWorks").value;
  const scored = submissions.map((submission) => ({
    ...submission,
    score: getScoreSummary(submission.id),
    similarity: getDraftSimilarity(submission)
  }));

  const filtered = scored
    .filter((item) => !classFilter || item.class_name === classFilter)
    .filter((item) => !ecosystemFilter || item.ecosystem_type === ecosystemFilter)
    .filter((item) => !seatFilter || displaySubmissionSeats(item).includes(seatFilter))
    .sort((a, b) => sortSubmissions(a, b, sortBy));

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-gallery">尚無符合條件的作品</div>`;
    return;
  }

  grid.innerHTML = filtered.map(renderWorkCard).join("");
  $$(".rating-form", grid).forEach((form) => form.addEventListener("submit", handleRating));
  $$(".presentation-open", grid).forEach((button) => {
    button.addEventListener("click", () => openPresentation(button.dataset.id));
  });
  initIcons();
}

function updateClassFilterOptions() {
  const select = $("#filterClass");
  if (!select) return;
  const current = select.value;
  const classes = [...new Set(submissions.map((item) => item.class_name).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "zh-Hant", { numeric: true }));
  select.innerHTML = `<option value="">全部</option>${classes.map((className) => `<option value="${escapeAttr(className)}">${escapeHtml(className)}</option>`).join("")}`;
  if (classes.includes(current)) {
    select.value = current;
  }
}

function updateTeacherClassFilterOptions() {
  const select = $("#teacherFilterClass");
  if (!select) return;
  const current = select.value;
  const classes = [...new Set(submissions.map((item) => item.class_name).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "zh-Hant", { numeric: true }));
  select.innerHTML = `<option value="">全部班級</option>${classes.map((className) => `<option value="${escapeAttr(className)}">${escapeHtml(className)}</option>`).join("")}`;
  if (classes.includes(current)) {
    select.value = current;
  }
}

function getTeacherFilteredSubmissions() {
  const classFilter = $("#teacherFilterClass")?.value || "";
  return classFilter
    ? submissions.filter((submission) => submission.class_name === classFilter)
    : [...submissions];
}

function getTeacherFilteredRatings(filteredSubmissions) {
  const visibleIds = new Set(filteredSubmissions.map((submission) => submission.id));
  return ratings.filter((rating) => visibleIds.has(rating.submission_id));
}

function renderWorkCard(item) {
  const ownWork = session && item.owner_token === session.ownerToken;
  const rated = ratings.some((rating) => rating.submission_id === item.id && rating.rater_owner_token === session?.ownerToken);
  const scoreLabel = item.score.count ? item.score.average.toFixed(1) : "-";
  const disabledReason = ownWork ? "自己的作品" : rated ? "已評分" : "";

  return `
    <article class="work-card">
      <button class="work-image-btn presentation-open" type="button" data-id="${escapeAttr(item.id)}" aria-label="放大展示 ${escapeAttr(item.ecosystem_type)} 作品">
        <img src="${escapeAttr(item.image_url)}" alt="${escapeAttr(item.ecosystem_type)}作品圖片" loading="lazy" />
        <span><i data-lucide="maximize-2"></i> 放大展示</span>
      </button>
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
        <div class="similarity-line">
          <span>草案相似度</span>
          <strong class="similarity-pill ${similarityClass(item.similarity.average)}">${item.similarity.average}%</strong>
          <span>${escapeHtml(item.similarity.label)}</span>
        </div>
        <details>
          <summary>查看 Prompt</summary>
          <p>${escapeHtml(item.prompt)}</p>
        </details>
        <button class="secondary-btn full presentation-open" type="button" data-id="${escapeAttr(item.id)}">
          <i data-lucide="presentation"></i>
          <span>大螢幕介紹</span>
        </button>
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

function openPresentation(submissionId) {
  const item = submissions.find((submission) => submission.id === submissionId);
  if (!item) return;
  const score = getScoreSummary(item.id);
  const similarity = getDraftSimilarity(item);
  $("#presentationImage").src = item.image_url;
  $("#presentationImage").alt = `${item.ecosystem_type}作品圖片`;
  $("#presentationTitle").textContent = item.ecosystem_type;
  $("#presentationMeta").innerHTML = `
    <span>${escapeHtml(item.class_name)} 班</span>
    <span>${escapeHtml(displaySubmissionSeats(item))} 號</span>
    <span>${escapeHtml(displaySubmissionNames(item))}</span>
  `;
  $("#presentationScore").innerHTML = `
    <div><span>平均分數</span><strong>${score.count ? score.average.toFixed(1) : "-"}</strong><small>${score.count} 人評分</small></div>
    <div><span>草案相似度</span><strong class="similarity-pill ${similarityClass(similarity.average)}">${similarity.average}%</strong><small>${escapeHtml(similarity.label)}</small></div>
  `;
  $("#presentationPrompt").textContent = item.prompt || "-";
  $("#presentationModal").classList.remove("hidden");
  document.body.classList.add("modal-open");
  initIcons();
}

function closePresentation() {
  const modal = $("#presentationModal");
  if (!modal || modal.classList.contains("hidden")) return;
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  $("#presentationImage").src = "";
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

  updateTeacherClassFilterOptions();
  const visibleSubmissions = getTeacherFilteredSubmissions();
  const visibleRatings = getTeacherFilteredRatings(visibleSubmissions);
  const summaries = visibleSubmissions.map((submission) => ({
    ...submission,
    score: getScoreSummary(submission.id),
    similarity: getDraftSimilarity(submission)
  }));
  const ratedWorks = summaries.filter((item) => item.score.count > 0);
  const allRatingScores = visibleRatings.map((rating) => Number(rating.score)).filter(Boolean);
  const classAverage = allRatingScores.length
    ? (allRatingScores.reduce((sum, score) => sum + score, 0) / allRatingScores.length).toFixed(1)
    : "-";

  $("#statSubmissions").textContent = summaries.length;
  $("#statRated").textContent = ratedWorks.length;
  $("#statAverage").textContent = classAverage;
  $("#statRatings").textContent = visibleRatings.length;

  const sortedSummaries = summaries.sort((a, b) => sortSeat(a.student_a_seat) - sortSeat(b.student_a_seat));
  $("#teacherRows").innerHTML = sortedSummaries.length
    ? sortedSummaries.map((item) => `
      <tr>
        <td>${escapeHtml(item.class_name)}</td>
        <td>${escapeHtml(displaySubmissionSeats(item))}</td>
        <td>${escapeHtml(displaySubmissionNames(item))}</td>
        <td>${escapeHtml(item.ecosystem_type)}</td>
        <td><span class="similarity-pill ${similarityClass(item.similarity.average)}">${item.similarity.average}%</span><br><small>${escapeHtml(item.similarity.label)}</small></td>
        <td>${item.score.count ? item.score.average.toFixed(1) : "-"}</td>
        <td>${item.score.count}</td>
        <td>${formatDate(item.created_at)}</td>
        <td><a href="${escapeAttr(item.image_url)}" target="_blank" rel="noreferrer">開啟</a></td>
        <td>
          <button class="danger-btn delete-work-btn" type="button" data-id="${escapeAttr(item.id)}">
            <i data-lucide="trash-2"></i>
            <span>刪除</span>
          </button>
        </td>
      </tr>
    `)
    .join("")
    : `<tr><td colspan="10">目前沒有這個班級的繳交作品。</td></tr>`;

  const commentHtml = visibleRatings.length
    ? visibleRatings.map((rating) => {
      const work = visibleSubmissions.find((submission) => submission.id === rating.submission_id);
      return `
        <div class="comment-item">
          <div class="comment-item-head">
            <strong>${escapeHtml(rating.score)} 分｜${escapeHtml(rating.rater_seat)} 號 ${escapeHtml(rating.rater_name)}</strong>
            <button class="danger-btn delete-rating-btn" type="button" data-id="${escapeAttr(rating.id || "")}" ${rating.id ? "" : "disabled"}>
              <i data-lucide="trash-2"></i>
              <span>刪除評分</span>
            </button>
          </div>
          <p>${escapeHtml(work?.ecosystem_type || "作品")}｜${escapeHtml(displaySubmissionNames(work || {}))}</p>
          <p>優點：${escapeHtml(rating.strength || "-")}</p>
          <p>可增加：${escapeHtml(rating.suggestion || "-")}</p>
        </div>
      `;
    }).join("")
    : `<div class="comment-item"><p>尚無評分回饋。</p></div>`;

  $("#teacherComments").innerHTML = commentHtml;

  $("#teacherSubmissionDetails").innerHTML = sortedSummaries.length
    ? sortedSummaries
      .map(renderTeacherSubmissionDetail)
      .join("")
    : `<div class="comment-item"><p>尚無繳交資料。</p></div>`;
  bindDeleteButtons();
  initIcons();
}

function bindDeleteButtons() {
  $$(".delete-work-btn").forEach((button) => {
    button.addEventListener("click", () => deleteSubmission(button.dataset.id));
  });
  $$(".delete-rating-btn").forEach((button) => {
    button.addEventListener("click", () => deleteRating(button.dataset.id));
  });
}

async function deleteSubmission(submissionId) {
  const item = submissions.find((submission) => submission.id === submissionId);
  if (!item) return;
  const ok = window.confirm(`確定要刪除 ${item.class_name} 班 ${displaySubmissionSeats(item)} 號的作品嗎？\n\n刪除後作品與同儕評分會一起移除。`);
  if (!ok) return;

  try {
    if (supabaseClient) {
      await supabaseClient.from("ratings").delete().eq("submission_id", submissionId);
      const { error } = await supabaseClient.from("submissions").delete().eq("id", submissionId);
      if (error) throw error;
      if (item.image_path) {
        await supabaseClient.storage.from(CONFIG.STORAGE_BUCKET).remove([item.image_path]);
      }
    } else {
      submissions = submissions.filter((submission) => submission.id !== submissionId);
      ratings = ratings.filter((rating) => rating.submission_id !== submissionId);
      saveJson(storageKeys.submissions, submissions);
      saveJson(storageKeys.ratings, ratings);
    }

    await refreshData();
    renderGallery();
    renderTeacher();
    toast("作品已刪除。");
  } catch (error) {
    toast(error.message || "刪除失敗，請確認 Supabase delete policy。");
  }
}

async function deleteRating(ratingId) {
  if (!ratingId) {
    toast("找不到這筆評分資料。");
    return;
  }
  const rating = ratings.find((item) => item.id === ratingId);
  if (!rating) {
    toast("找不到這筆評分資料。");
    return;
  }

  const ok = window.confirm(`確定要刪除 ${rating.rater_seat} 號 ${rating.rater_name} 的這筆評分嗎？\n\n刪除後只會移除這筆分數與評論，作品會保留。`);
  if (!ok) return;

  try {
    if (supabaseClient) {
      const { error } = await supabaseClient.from("ratings").delete().eq("id", ratingId);
      if (error) throw error;
    } else {
      ratings = ratings.filter((item) => item.id !== ratingId);
      saveJson(storageKeys.ratings, ratings);
    }

    await refreshData();
    renderGallery();
    renderTeacher();
    toast("評分已刪除。");
  } catch (error) {
    toast(error.message || "刪除評分失敗，請確認 Supabase delete policy。");
  }
}

function exportCsv() {
  const header = [
    "班級",
    "座號",
    "姓名",
    "生態系",
    "環境特色",
    "植物特色",
    "動物特色",
    "生物互動",
    "Prompt",
    "草案總相似度",
    "環境相似度",
    "植物相似度",
    "動物相似度",
    "互動相似度",
    "相似度判讀",
    "圖片連結",
    "平均分數",
    "評分人數",
    "繳交時間"
  ];
  const exportItems = getTeacherFilteredSubmissions();
  const selectedClass = ($("#teacherFilterClass")?.value || "all").replace(/[\\/:*?"<>|]/g, "-");
  const rows = exportItems.map((item) => {
    const summary = getScoreSummary(item.id);
    const similarity = getDraftSimilarity(item);
    return [
      item.class_name,
      displaySubmissionSeats(item),
      displaySubmissionNames(item),
      item.ecosystem_type,
      item.environment_notes,
      item.plant_notes,
      item.animal_notes,
      item.relationship_notes,
      item.prompt,
      `${similarity.average}%`,
      `${similarity.environment}%`,
      `${similarity.plants}%`,
      `${similarity.animals}%`,
      `${similarity.relationships}%`,
      similarity.label,
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
  link.download = `ecosystem-submissions-${selectedClass}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function renderTeacherSubmissionDetail(item) {
  return `
    <article class="teacher-detail-card">
      <div class="teacher-detail-head">
        <div>
          <strong>${escapeHtml(displaySubmissionSeats(item))} 號｜${escapeHtml(displaySubmissionNames(item))}</strong>
          <p>${escapeHtml(item.class_name)} 班｜${escapeHtml(item.ecosystem_type)}</p>
        </div>
        <div class="similarity-summary">
          <span class="similarity-pill ${similarityClass(item.similarity.average)}">${item.similarity.average}%</span>
          <small>${escapeHtml(item.similarity.label)}</small>
        </div>
      </div>
      <div class="teacher-text-grid">
        <section>
          <h3>環境特色 <small>${item.similarity.environment}%</small></h3>
          <p>${escapeHtml(item.environment_notes || "-")}</p>
        </section>
        <section>
          <h3>植物特色 <small>${item.similarity.plants}%</small></h3>
          <p>${escapeHtml(item.plant_notes || "-")}</p>
        </section>
        <section>
          <h3>動物特色 <small>${item.similarity.animals}%</small></h3>
          <p>${escapeHtml(item.animal_notes || "-")}</p>
        </section>
        <section>
          <h3>生物互動 <small>${item.similarity.relationships}%</small></h3>
          <p>${escapeHtml(item.relationship_notes || "-")}</p>
        </section>
      </div>
      <details class="teacher-prompt-detail">
        <summary>查看最後 Prompt</summary>
        <p>${escapeHtml(item.prompt || "-")}</p>
      </details>
      <button class="danger-btn delete-work-btn" type="button" data-id="${escapeAttr(item.id)}">
        <i data-lucide="trash-2"></i>
        <span>刪除此作品</span>
      </button>
    </article>
  `;
}

function resetSubmissionForm() {
  $("#submissionForm").reset();
  generatedImage = null;
  resetDraftPanel();
  updateDraftAccess();
  $("#externalAiNotice").classList.add("hidden");
  setPreviewImage("", "尚未上傳");
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

function getDraftSimilarity(submission) {
  const draft = ECOSYSTEM_DRAFTS[submission.ecosystem_type];
  const scores = {
    environment: draft ? textSimilarityPercent(submission.environment_notes, draft.environment) : 0,
    plants: draft ? textSimilarityPercent(submission.plant_notes, draft.plants) : 0,
    animals: draft ? textSimilarityPercent(submission.animal_notes, draft.animals) : 0,
    relationships: draft ? textSimilarityPercent(submission.relationship_notes, draft.relationships) : 0
  };
  const values = Object.values(scores);
  const average = values.length ? Math.round(values.reduce((sum, score) => sum + score, 0) / values.length) : 0;
  return {
    ...scores,
    average,
    label: similarityLabel(average)
  };
}

function textSimilarityPercent(studentText, draftText) {
  const studentTokens = tokenizeForSimilarity(studentText);
  const draftTokens = tokenizeForSimilarity(draftText);
  if (!studentTokens.length || !draftTokens.length) return 0;

  const studentSet = new Set(studentTokens);
  const draftSet = new Set(draftTokens);
  const shared = [...studentSet].filter((token) => draftSet.has(token)).length;
  const coverage = shared / draftSet.size;
  const overlap = shared / studentSet.size;
  const phraseBoost = longestCommonSubstringRatio(normalizeText(studentText), normalizeText(draftText));

  return Math.round(Math.max(coverage * 0.55 + overlap * 0.25 + phraseBoost * 0.2, 0) * 100);
}

function tokenizeForSimilarity(value) {
  const normalized = normalizeText(value);
  if (!normalized) return [];

  const words = normalized.match(/[a-z0-9]+/g) || [];
  const chinese = normalized.replace(/[a-z0-9\s]/g, "");
  const grams = [];
  for (let i = 0; i < chinese.length - 1; i += 1) {
    grams.push(chinese.slice(i, i + 2));
  }
  return [...words, ...grams].filter((token) => token.length >= 2 && !SIMILARITY_STOP_TOKENS.has(token));
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[，。！？、；：「」『』（）()【】\[\]《》,.!?;:'"“”‘’\-_/\\|0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function longestCommonSubstringRatio(a, b) {
  if (!a || !b) return 0;
  const shorter = a.length <= b.length ? a : b;
  const longer = a.length <= b.length ? b : a;
  let best = 0;
  const previous = new Array(longer.length + 1).fill(0);

  for (let i = 1; i <= shorter.length; i += 1) {
    let prevDiagonal = 0;
    for (let j = 1; j <= longer.length; j += 1) {
      const temp = previous[j];
      previous[j] = shorter[i - 1] === longer[j - 1] ? prevDiagonal + 1 : 0;
      if (previous[j] > best) best = previous[j];
      prevDiagonal = temp;
    }
  }

  return best / Math.max(shorter.length, 1);
}

function similarityLabel(score) {
  if (score >= 90) return "幾乎是內建草案";
  if (score >= 75) return "高度接近草案";
  if (score >= 50) return "部分參考草案";
  if (score >= 25) return "有明顯自行整理";
  return "與草案差異大";
}

function similarityClass(score) {
  if (score >= 75) return "high";
  if (score >= 50) return "medium";
  return "low";
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

async function throwFunctionError(error) {
  let message = error?.message || "Edge Function 呼叫失敗。";
  const context = error?.context;
  if (context && typeof context.json === "function") {
    try {
      const body = await context.json();
      message = body?.error || body?.message || message;
    } catch {
      try {
        const text = await context.text();
        message = text || message;
      } catch {
        // Keep the original message if the response body has already been read.
      }
    }
  }
  throw new Error(message);
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
