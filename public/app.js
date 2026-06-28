const productOptions = [
  "Chicken Patty",
  "French Fries",
  "Onion Rings",
  "Burger Bun",
  "Tomato",
  "Cheese",
  "Rotten Vegetables",
  "Damaged Packaging",
  "Burned Food",
  "Wrong Product",
  "Missing Ingredients"
];

const employeeOptions = ["Айдана С.", "Нурбек К.", "Мария Л.", "Ержан Т.", "Команда смены"];
const reasonValues = ["Dropped", "Not cooked", "Bad quality", "Burned", "Damaged", "Expired", "Supplier defect", "Other"];
const ROLE_STORAGE_KEY = "bahandisation-role-v2";
const OLD_ROLE_STORAGE_KEY = "bahandisation-role";
localStorage.removeItem(OLD_ROLE_STORAGE_KEY);

const copy = {
  ru: {
    brand: "Bahandisation",
    topEyebrow: "Bahandisation AI",
    navEmployee: "Сотрудник",
    navReport: "Списание",
    navManager: "Менеджер",
    navAnalytics: "AI-точность",
    bottomHome: "Дом",
    bottomReport: "Заявка",
    bottomApprove: "Проверка",
    language: "Язык",
    employeeTitle: "Операционный AI-центр Bahandi",
    reportTitle: "Новая заявка",
    managerTitle: "Проверка списаний",
    analyticsTitle: "Точность Roboflow",
    authHeroTitle: "AI-центр списаний Bahandi",
    authHeroText: "Выберите роль один раз. Сотрудник попадет в быстрый сценарий фото -> AI -> причина -> отправка. Админ попадет в кабинет проверки, аналитики и поставщиков.",
    authCreateTitle: "Создайте аккаунт",
    authCreateText: "Выберите роль и войдите в рабочее пространство Bahandisation.",
    authRoleLabel: "Роль",
    authEmployeeTag: "Работник",
    authEmployeeTitle: "Регистрация работника",
    authManagerTitleShort: "Админ",
    authFirstName: "Имя",
    authLastName: "Фамилия",
    authEmail: "Email",
    authEmployeeName: "Имя работника",
    authBranchName: "Торговая точка",
    authContinue: "Продолжить",
    authAccountHint: "Уже есть аккаунт?",
    authSignIn: "Войти",
    authEmployeeButton: "Продолжить как работник",
    authManagerTag: "Админ",
    authManagerTitle: "Регистрация админа",
    authManagerName: "Имя админа",
    authManagerZone: "Зона управления",
    authManagerButton: "Продолжить как админ",
    heroTitle: "Сфотографируйте списание. Bahandisation скажет, что случилось.",
    heroText: "Наш API принимает фото, отправляет его в Roboflow на сервере и сразу возвращает текст: какой продукт уронили или испортили, сколько штук и насколько AI уверен.",
    startReport: "Открыть камеру",
    demoPhoto: "Демо-фото",
    todayBranch: "Сегодня",
    reportsToday: "Заявки сегодня",
    allWriteoffs: "Все отправленные списания",
    pending: "На проверке",
    managerQueue: "Очередь менеджера",
    avgConfidence: "Средняя уверенность",
    recentReports: "Последние заявки",
    noReports: "Пока нет заявок. Сделайте первое списание.",
    aiCoach: "AI Coach",
    coachTitle: "Bahandisation замечает повторяющиеся причины списаний.",
    coachText: "Если сотрудник часто исправляет AI-результат, это попадет в аналитику точности и поможет переобучить будущую Roboflow-модель.",
    photoTitle: "Фото продукта",
    uploadTitle: "Загрузить или снять фото",
    uploadHint: "После загрузки анализ запустится автоматически",
    replacePhoto: "Заменить фото",
    analyze: "Анализировать",
    analyzing: "Bahandisation анализирует фото",
    analyzingHint: "Фото уходит только в backend API, ключ Roboflow не раскрывается.",
    detectionEmpty: "Загрузите фото, и здесь сразу появится текст о том, что уронили или испортили.",
    detectedTextTitle: "AI-вывод",
    lowConfidence: "AI-вывод готов.",
    confirm: "Подтвердить",
    edit: "Изменить",
    manualMode: "Ручной режим",
    finalReport: "Финальная заявка",
    branch: "Торговая точка",
    product: "Продукт",
    chooseManual: "Выберите вручную",
    quantity: "Количество",
    reason: "Причина",
    writeoffType: "Тип списания",
    withoutDeduction: "Без удержания",
    withDeduction: "С удержанием",
    employee: "Сотрудник",
    notSelected: "Не выбран",
    comment: "Комментарий",
    commentPlaceholder: "Минимум 10 символов",
    submit: "Подтвердить списание",
    reportSent: "Заявка отправлена менеджеру.",
    addPhoto: "Добавьте фото списания.",
    chooseProduct: "Выберите продукт.",
    commentMin: "Комментарий: минимум 10 символов.",
    fileLarge: "Файл больше 8 МБ.",
    addPhotoToAnalyze: "Добавьте фото.",
    aiReady: "AI-вывод готов.",
    aiUnavailable: "AI недоступен. Включен ручной режим.",
    aiConfirmed: "AI-результат подтвержден.",
    manualEnabled: "Ручной режим включен.",
    losses: "Потери",
    allRequests: "Все заявки",
    approval: "Одобрение",
    approved: "Одобрено",
    rejected: "Отклонено",
    prevented: "Предотвращено",
    corrections: "Правки",
    employeeCorrections: "Правки сотрудника",
    approvalQueue: "Очередь заявок",
    noPending: "Нет заявок на проверке.",
    suppliers: "Поставщики",
    complaints: "жалоб",
    history: "История",
    historyEmpty: "История появится после первой заявки.",
    approvedToast: "Заявка одобрена.",
    rejectedToast: "Заявка отклонена.",
    aiDashboard: "AI Accuracy Dashboard",
    falseDetections: "Ложные определения",
    lowOrCorrection: "Правки сотрудника",
    objectCount: "Объекты",
    allPhotos: "Все фото",
    productLosses: "Потери по продуктам",
    noCorrections: "Исправления появятся после отправки заявок.",
    noLosses: "Потери появятся после отправки заявок.",
    analyticsText: "Каждая заявка хранит исходное фото, AI prediction и финальную правку сотрудника. Эти данные идут в approval rate, false detections и будущую донастройку Roboflow.",
    statusLive: "Roboflow live",
    statusDemo: "Demo API",
    narrativeLow: "Фото проанализировано. Проверьте продукт и количество перед отправкой.",
    narrativeFound: "Мы нашли: {product}, {quantity} шт. Похоже, продукт уронили или испортили; подтвердите перед отправкой.",
    units: "шт",
    langName: "Русский"
  },
  en: {
    brand: "Bahandisation",
    topEyebrow: "Bahandisation AI",
    navEmployee: "Employee",
    navReport: "Write-off",
    navManager: "Manager",
    navAnalytics: "AI accuracy",
    bottomHome: "Home",
    bottomReport: "Report",
    bottomApprove: "Approve",
    language: "Language",
    employeeTitle: "Bahandi AI operations center",
    reportTitle: "New report",
    managerTitle: "Approval queue",
    analyticsTitle: "Roboflow accuracy",
    authHeroTitle: "Bahandi AI write-off center",
    authHeroText: "Choose a role once. Employees go to the fast photo -> AI -> reason -> submit flow. Admins go to approvals, analytics, and supplier control.",
    authCreateTitle: "Create your account",
    authCreateText: "Choose a role and enter the Bahandisation workspace.",
    authRoleLabel: "Role",
    authEmployeeTag: "Employee",
    authEmployeeTitle: "Employee registration",
    authManagerTitleShort: "Admin",
    authFirstName: "First name",
    authLastName: "Last name",
    authEmail: "Email",
    authEmployeeName: "Employee name",
    authBranchName: "Branch",
    authContinue: "Continue",
    authAccountHint: "Already have an account?",
    authSignIn: "Sign in",
    authEmployeeButton: "Continue as employee",
    authManagerTag: "Admin",
    authManagerTitle: "Admin registration",
    authManagerName: "Admin name",
    authManagerZone: "Management zone",
    authManagerButton: "Continue as admin",
    heroTitle: "Photograph the write-off. Bahandisation explains what happened.",
    heroText: "Our API accepts the photo, sends it to Roboflow from the backend, and instantly returns text: which product was dropped or spoiled, quantity, and AI confidence.",
    startReport: "Open camera",
    demoPhoto: "Demo photo",
    todayBranch: "Today",
    reportsToday: "Reports today",
    allWriteoffs: "All submitted write-offs",
    pending: "Pending",
    managerQueue: "Manager queue",
    avgConfidence: "Average confidence",
    recentReports: "Recent reports",
    noReports: "No reports yet. Create the first write-off.",
    aiCoach: "AI Coach",
    coachTitle: "Bahandisation spots repeated write-off causes.",
    coachText: "If employees often correct an AI result, it is tracked in accuracy analytics and helps improve future Roboflow models.",
    photoTitle: "Product photo",
    uploadTitle: "Upload or capture photo",
    uploadHint: "Analysis starts automatically after upload",
    replacePhoto: "Replace photo",
    analyze: "Analyze",
    analyzing: "Bahandisation is analyzing the photo",
    analyzingHint: "The photo goes only to the backend API; the Roboflow key is never exposed.",
    detectionEmpty: "Upload a photo and the text about what was dropped or spoiled will appear here.",
    detectedTextTitle: "AI output",
    lowConfidence: "AI output is ready.",
    confirm: "Confirm",
    edit: "Edit",
    manualMode: "Manual mode",
    finalReport: "Final report",
    branch: "Branch",
    product: "Product",
    chooseManual: "Choose manually",
    quantity: "Quantity",
    reason: "Reason",
    writeoffType: "Write-off type",
    withoutDeduction: "Without deduction",
    withDeduction: "With deduction",
    employee: "Employee",
    notSelected: "Not selected",
    comment: "Comment",
    commentPlaceholder: "Minimum 10 characters",
    submit: "Submit write-off",
    reportSent: "Report sent to manager.",
    addPhoto: "Add a write-off photo.",
    chooseProduct: "Choose a product.",
    commentMin: "Comment must be at least 10 characters.",
    fileLarge: "File is larger than 8 MB.",
    addPhotoToAnalyze: "Add a photo.",
    aiReady: "AI output is ready.",
    aiUnavailable: "AI is unavailable. Manual mode is enabled.",
    aiConfirmed: "AI result confirmed.",
    manualEnabled: "Manual mode enabled.",
    losses: "Losses",
    allRequests: "All requests",
    approval: "Approval",
    approved: "Approved",
    rejected: "Rejected",
    prevented: "Prevented",
    corrections: "Corrections",
    employeeCorrections: "Employee corrections",
    approvalQueue: "Approval queue",
    noPending: "No pending reports.",
    suppliers: "Suppliers",
    complaints: "complaints",
    history: "History",
    historyEmpty: "History will appear after the first report.",
    approvedToast: "Report approved.",
    rejectedToast: "Report rejected.",
    aiDashboard: "AI Accuracy Dashboard",
    falseDetections: "False detections",
    lowOrCorrection: "Employee correction",
    objectCount: "Objects",
    allPhotos: "All photos",
    productLosses: "Product losses",
    noCorrections: "Corrections will appear after reports are submitted.",
    noLosses: "Losses will appear after reports are submitted.",
    analyticsText: "Every report stores the original image, AI prediction, and final employee correction. These data feed approval rate, false detections, and future Roboflow improvements.",
    statusLive: "Roboflow live",
    statusDemo: "Demo API",
    narrativeLow: "The image has been analyzed. Check the product and quantity before submitting.",
    narrativeFound: "We found {quantity} pcs of {product}. It looks dropped or spoiled; please confirm before submitting.",
    units: "pcs",
    langName: "English"
  },
  kz: {
    brand: "Bahandisation",
    topEyebrow: "Bahandisation AI",
    navEmployee: "Қызметкер",
    navReport: "Есептен шығару",
    navManager: "Менеджер",
    navAnalytics: "AI дәлдігі",
    bottomHome: "Басты",
    bottomReport: "Өтінім",
    bottomApprove: "Тексеру",
    language: "Тіл",
    employeeTitle: "Bahandi AI операция орталығы",
    reportTitle: "Жаңа өтінім",
    managerTitle: "Есептен шығаруды тексеру",
    analyticsTitle: "Roboflow дәлдігі",
    authHeroTitle: "Bahandi AI есептен шығару орталығы",
    authHeroText: "Рөлді бір рет таңдаңыз. Қызметкер фото -> AI -> себеп -> жіберу сценарийіне өтеді. Админ тексеру, аналитика және жеткізушілер кабинетіне өтеді.",
    authCreateTitle: "Аккаунт жасаңыз",
    authCreateText: "Рөлді таңдап, Bahandisation жұмыс кеңістігіне кіріңіз.",
    authRoleLabel: "Рөл",
    authEmployeeTag: "Қызметкер",
    authEmployeeTitle: "Қызметкерді тіркеу",
    authManagerTitleShort: "Админ",
    authFirstName: "Аты",
    authLastName: "Тегі",
    authEmail: "Email",
    authEmployeeName: "Қызметкер аты",
    authBranchName: "Сауда нүктесі",
    authContinue: "Жалғастыру",
    authAccountHint: "Аккаунтыңыз бар ма?",
    authSignIn: "Кіру",
    authEmployeeButton: "Қызметкер ретінде жалғастыру",
    authManagerTag: "Админ",
    authManagerTitle: "Админді тіркеу",
    authManagerName: "Админ аты",
    authManagerZone: "Басқару аймағы",
    authManagerButton: "Админ ретінде жалғастыру",
    heroTitle: "Есептен шығатын өнімді суретке түсіріңіз. Bahandisation не болғанын айтады.",
    heroText: "Біздің API фотоны қабылдап, backend арқылы Roboflow-ға жібереді және бірден мәтін қайтарады: қандай өнім құлаған немесе бұзылған, саны және AI сенімділігі.",
    startReport: "Камераны ашу",
    demoPhoto: "Демо фото",
    todayBranch: "Бүгін",
    reportsToday: "Бүгінгі өтінімдер",
    allWriteoffs: "Барлық жіберілген есептен шығарулар",
    pending: "Тексеруде",
    managerQueue: "Менеджер кезегі",
    avgConfidence: "Орташа сенімділік",
    recentReports: "Соңғы өтінімдер",
    noReports: "Әзірге өтінім жоқ. Бірінші есептен шығаруды жасаңыз.",
    aiCoach: "AI Coach",
    coachTitle: "Bahandisation қайталанатын себептерді байқайды.",
    coachText: "Қызметкерлер AI нәтижесін жиі түзетсе, ол дәлдік аналитикасына түсіп, болашақ Roboflow моделін жақсартуға көмектеседі.",
    photoTitle: "Өнім фотосы",
    uploadTitle: "Фото жүктеу немесе түсіру",
    uploadHint: "Жүктелгеннен кейін талдау автоматты басталады",
    replacePhoto: "Фотоны ауыстыру",
    analyze: "Талдау",
    analyzing: "Bahandisation фотоны талдап жатыр",
    analyzingHint: "Фото тек backend API-ға жіберіледі; Roboflow кілті ашылмайды.",
    detectionEmpty: "Фото жүктеңіз, құлаған немесе бұзылған өнім туралы мәтін осы жерде шығады.",
    detectedTextTitle: "AI қорытындысы",
    lowConfidence: "AI қорытындысы дайын.",
    confirm: "Растау",
    edit: "Өзгерту",
    manualMode: "Қолмен енгізу",
    finalReport: "Соңғы өтінім",
    branch: "Сауда нүктесі",
    product: "Өнім",
    chooseManual: "Қолмен таңдаңыз",
    quantity: "Саны",
    reason: "Себеп",
    writeoffType: "Есептен шығару түрі",
    withoutDeduction: "Ұсталымсыз",
    withDeduction: "Ұсталыммен",
    employee: "Қызметкер",
    notSelected: "Таңдалмаған",
    comment: "Пікір",
    commentPlaceholder: "Кемінде 10 таңба",
    submit: "Есептен шығаруды растау",
    reportSent: "Өтінім менеджерге жіберілді.",
    addPhoto: "Есептен шығару фотосын қосыңыз.",
    chooseProduct: "Өнімді таңдаңыз.",
    commentMin: "Пікір кемінде 10 таңба болуы керек.",
    fileLarge: "Файл 8 МБ-тан үлкен.",
    addPhotoToAnalyze: "Фото қосыңыз.",
    aiReady: "AI қорытындысы дайын.",
    aiUnavailable: "AI қолжетімсіз. Қолмен енгізу қосылды.",
    aiConfirmed: "AI нәтижесі расталды.",
    manualEnabled: "Қолмен енгізу қосылды.",
    losses: "Шығындар",
    allRequests: "Барлық өтінімдер",
    approval: "Мақұлдау",
    approved: "Мақұлданды",
    rejected: "Қабылданбады",
    prevented: "Алдын алынды",
    corrections: "Түзетулер",
    employeeCorrections: "Қызметкер түзетулері",
    approvalQueue: "Өтінімдер кезегі",
    noPending: "Тексерілетін өтінім жоқ.",
    suppliers: "Жеткізушілер",
    complaints: "шағым",
    history: "Тарих",
    historyEmpty: "Тарих бірінші өтінімнен кейін пайда болады.",
    approvedToast: "Өтінім мақұлданды.",
    rejectedToast: "Өтінім қабылданбады.",
    aiDashboard: "AI дәлдік панелі",
    falseDetections: "Қате анықтаулар",
    lowOrCorrection: "Қызметкер түзетуі",
    objectCount: "Объектілер",
    allPhotos: "Барлық фото",
    productLosses: "Өнім шығындары",
    noCorrections: "Түзетулер өтінімдерден кейін пайда болады.",
    noLosses: "Шығындар өтінімдерден кейін пайда болады.",
    analyticsText: "Әр өтінім бастапқы фотоны, AI болжамын және қызметкердің соңғы түзетуін сақтайды. Бұл деректер approval rate, false detections және Roboflow жақсартуына қолданылады.",
    statusLive: "Roboflow live",
    statusDemo: "Demo API",
    narrativeLow: "Сурет талданды. Жіберер алдында өнім мен санын тексеріңіз.",
    narrativeFound: "Біз {product} өнімін таптық: {quantity} дана. Өнім құлаған немесе бұзылған сияқты, жіберер алдында растаңыз.",
    units: "дана",
    langName: "Қазақша"
  }
};

const supplementalCopy = {
  ru: {
    navEmployeeProfile: "Профиль",
    navPersonal: "Мои результаты",
    navManagerProfile: "Профиль менеджера",
    navRequests: "Проверка",
    navSuppliers: "Поставщики",
    navReports: "Отчеты",
    navExecutive: "Executive",
    requestsTitle: "Проверка заявок",
    suppliersTitle: "Поставщики",
    reportsTitle: "PDF-отчеты",
    executiveTitle: "Executive Dashboard",
    workerTitle: "Сотрудник точки",
    workerProfile: "Личный аккаунт",
    workerPoint: "Торговая точка",
    workerSave: "Сохранить точку",
    workerHistory: "История отправленных проблем",
    workerOpenIssue: "Списать товар",
    workerHint: "Только два окна: профиль и отправка списания. Все лишнее скрыто.",
    password: "Пароль",
    authMissing: "Введите email и пароль.",
    profileSaved: "Профиль сохранен.",
    reportAssistant: "AI-детектор Roboflow",
    reportAssistantText: "Загрузите фото. Backend отправит его в Roboflow, вернет продукт, количество и уверенность. Перед отправкой сотрудник все подтверждает.",
    managerProfileText: "Контроль заявок, потерь, поставщиков и точности AI по всем точкам Bahandi.",
    controlCenter: "Центр контроля",
    pendingRequests: "Ожидают решения",
    approvedTable: "Одобренные списания",
    heatMap: "Карта потерь по точкам",
    rootCause: "AI root cause",
    forecast: "Прогноз потерь",
    supplierQuality: "Качество поставок",
    pdfToday: "День",
    pdfWeek: "Неделя",
    pdfMonth: "Месяц",
    pdfQuarter: "Квартал",
    pdfYear: "Год",
    pdfIiko: "Акт iiko",
    downloadPdf: "Скачать PDF"
  },
  en: {
    navEmployeeProfile: "Profile",
    navPersonal: "My results",
    navManagerProfile: "Manager profile",
    navRequests: "Review",
    navSuppliers: "Suppliers",
    navReports: "Reports",
    navExecutive: "Executive",
    requestsTitle: "Request review",
    suppliersTitle: "Suppliers",
    reportsTitle: "PDF reports",
    executiveTitle: "Executive Dashboard",
    workerTitle: "Store employee",
    workerProfile: "Personal account",
    workerPoint: "Working point",
    workerSave: "Save point",
    workerHistory: "Submitted issue history",
    workerOpenIssue: "Write off product",
    workerHint: "Only two windows: profile and issue submission. Everything else is hidden.",
    password: "Password",
    authMissing: "Enter email and password.",
    profileSaved: "Profile saved.",
    reportAssistant: "Roboflow AI detector",
    reportAssistantText: "Upload a photo. The backend sends it to Roboflow and returns product, quantity, and confidence. The employee confirms everything before submitting.",
    managerProfileText: "Control requests, losses, suppliers, and AI accuracy across Bahandi branches.",
    controlCenter: "Control center",
    pendingRequests: "Waiting for decision",
    approvedTable: "Approved write-offs",
    heatMap: "Branch loss map",
    rootCause: "AI root cause",
    forecast: "Loss forecast",
    supplierQuality: "Supply quality",
    pdfToday: "Day",
    pdfWeek: "Week",
    pdfMonth: "Month",
    pdfQuarter: "Quarter",
    pdfYear: "Year",
    pdfIiko: "iiko act",
    downloadPdf: "Download PDF"
  },
  kz: {
    navEmployeeProfile: "Профиль",
    navPersonal: "Нәтижелерім",
    navManagerProfile: "Менеджер профилі",
    navRequests: "Тексеру",
    navSuppliers: "Жеткізушілер",
    navReports: "Есептер",
    navExecutive: "Executive",
    requestsTitle: "Өтінімдерді тексеру",
    suppliersTitle: "Жеткізушілер",
    reportsTitle: "PDF есептер",
    executiveTitle: "Executive Dashboard",
    workerTitle: "Нүкте қызметкері",
    workerProfile: "Жеке аккаунт",
    workerPoint: "Жұмыс нүктесі",
    workerSave: "Нүктені сақтау",
    workerHistory: "Жіберілген мәселелер тарихы",
    workerOpenIssue: "Өнімді есептен шығару",
    workerHint: "Тек екі терезе: профиль және есептен шығару жіберу.",
    password: "Құпиясөз",
    authMissing: "Email және құпиясөз енгізіңіз.",
    profileSaved: "Профиль сақталды.",
    reportAssistant: "Roboflow AI детекторы",
    reportAssistantText: "Фото жүктеңіз. Backend оны Roboflow-ға жіберіп, өнімді, санын және сенімділікті қайтарады.",
    managerProfileText: "Bahandi нүктелері бойынша өтінімдерді, шығындарды, жеткізушілерді және AI дәлдігін бақылау.",
    controlCenter: "Бақылау орталығы",
    pendingRequests: "Шешім күтеді",
    approvedTable: "Мақұлданған есептен шығару",
    heatMap: "Нүктелер бойынша шығын картасы",
    rootCause: "AI root cause",
    forecast: "Шығын болжамы",
    supplierQuality: "Жеткізу сапасы",
    pdfToday: "Күн",
    pdfWeek: "Апта",
    pdfMonth: "Ай",
    pdfQuarter: "Тоқсан",
    pdfYear: "Жыл",
    pdfIiko: "iiko акті",
    downloadPdf: "PDF жүктеу"
  }
};

Object.entries(supplementalCopy).forEach(([language, labels]) => {
  copy[language] = { ...copy[language], ...labels };
});

Object.assign(copy.ru, {
  capturePhoto: "Снять фото",
  chooseGallery: "Галерея",
  roboflowNeedsKey: "Roboflow API key не подключен. Выберите продукт вручную.",
  aiNoProduct: "AI не смог определить продукт. Выберите продукт вручную."
});

Object.assign(copy.en, {
  capturePhoto: "Take photo",
  chooseGallery: "Gallery",
  roboflowNeedsKey: "Roboflow API key is not configured. Choose the product manually.",
  aiNoProduct: "AI could not detect a product. Choose the product manually."
});

Object.assign(copy.kz, {
  capturePhoto: "Фото түсіру",
  chooseGallery: "Галерея",
  roboflowNeedsKey: "Roboflow API key қосылмаған. Өнімді қолмен таңдаңыз.",
  aiNoProduct: "AI өнімді анықтай алмады. Өнімді қолмен таңдаңыз."
});

const productCopy = {
  "Chicken Patty": { ru: "Куриная котлета", en: "Chicken Patty", kz: "Тауық котлеті" },
  "French Fries": { ru: "Картофель фри", en: "French Fries", kz: "Фри картобы" },
  "Onion Rings": { ru: "Луковые кольца", en: "Onion Rings", kz: "Пияз сақиналары" },
  "Burger Bun": { ru: "Булочка", en: "Burger Bun", kz: "Бургер тоқашы" },
  Tomato: { ru: "Помидор", en: "Tomato", kz: "Қызанақ" },
  Cheese: { ru: "Сыр", en: "Cheese", kz: "Ірімшік" },
  "Rotten Vegetables": { ru: "Испорченные овощи", en: "Rotten Vegetables", kz: "Бұзылған көкөніс" },
  "Damaged Packaging": { ru: "Поврежденная упаковка", en: "Damaged Packaging", kz: "Зақымдалған қаптама" },
  "Burned Food": { ru: "Сгоревшая еда", en: "Burned Food", kz: "Күйген тағам" },
  "Wrong Product": { ru: "Неверный продукт", en: "Wrong Product", kz: "Қате өнім" },
  "Missing Ingredients": { ru: "Не хватает ингредиентов", en: "Missing Ingredients", kz: "Ингредиент жетіспейді" }
};

const reasonCopy = {
  Expired: { ru: "Просрочка", en: "Expired", kz: "Мерзімі өтті" },
  Burned: { ru: "Сгорело", en: "Burned", kz: "Күйіп кетті" },
  Damaged: { ru: "Повреждено", en: "Damaged", kz: "Зақымдалған" },
  Dropped: { ru: "Упало", en: "Dropped", kz: "Құлады" },
  "Wrong preparation": { ru: "Ошибка готовки", en: "Wrong prep", kz: "Дайындау қатесі" },
  "Supplier defect": { ru: "Брак поставщика", en: "Supplier defect", kz: "Жеткізуші ақауы" },
  Other: { ru: "Другое", en: "Other", kz: "Басқа" }
};

Object.assign(productCopy, {
  bun: { ru: "Булочка", en: "Bun", kz: "Бургер тоқашы" },
  patty: { ru: "Котлета", en: "Patty", kz: "Котлет" },
  cheese_slice: { ru: "Сыр", en: "Cheese", kz: "Ірімшік" },
  onion: { ru: "Лук", en: "Onion", kz: "Пияз" },
  fries: { ru: "Картофель фри", en: "Fries", kz: "Фри картобы" },
  sauce: { ru: "Соус", en: "Sauce", kz: "Соус" }
});

Object.assign(reasonCopy, {
  "Not cooked": { ru: "Не приготовлено", en: "Not cooked", kz: "Дайын емес" },
  "Bad quality": { ru: "Плохое качество", en: "Bad quality", kz: "Сапасы нашар" }
});

["bun", "patty", "cheese_slice", "onion", "fries", "sauce"].reverse().forEach((product) => {
  if (!productOptions.includes(product)) productOptions.unshift(product);
});

const state = {
  view: "employee",
  role: localStorage.getItem(ROLE_STORAGE_KEY) || "",
  authRole: "employee",
  auth: {
    firstName: "Айдана",
    lastName: "С.",
    email: "ayana@bahandi.kz",
    password: "bahandi2026"
  },
  profile: {
    title: "Сотрудник кухни",
    branchId: "",
    branchName: ""
  },
  menuOpen: false,
  reasonOpen: false,
  language: localStorage.getItem("wasteiq-language") || "ru",
  theme: localStorage.getItem("wasteiq-theme") || "light",
  stores: [],
  reports: [],
  analytics: {},
  health: null,
  image: "",
  imageName: "",
  detection: null,
  draftId: "",
  loading: false,
  submitting: false,
  form: {
    branchId: "",
    branchName: "",
    product: "",
    quantity: 1,
    unit: "pcs",
    reason: "Dropped",
    deductionType: "without_deduction",
    deductionEmployee: "",
    comment: ""
  }
};

const app = document.querySelector("#app");
const pageTitle = document.querySelector("#pageTitle");
const apiStatus = document.querySelector("#apiStatus");
const toast = document.querySelector("#toast");

function t(key, vars = {}) {
  const template = copy[state.language]?.[key] || copy.ru[key] || key;
  return Object.entries(vars).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), template);
}

function productLabel(product) {
  return productCopy[product]?.[state.language] || product || t("chooseManual");
}

function reasonLabel(reason) {
  return reasonCopy[reason]?.[state.language] || reason;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(value) {
  return new Intl.NumberFormat(state.language === "en" ? "en-US" : "ru-KZ", {
    style: "currency",
    currency: "KZT",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function dateTime(value) {
  return value
    ? new Intl.DateTimeFormat(state.language === "en" ? "en-US" : "ru-KZ", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(value))
    : "";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const payload = await response.json();
  if (!response.ok || payload.ok === false) throw new Error(payload.error || "Request failed.");
  return payload;
}

function pageTitleFor(view) {
  if (!state.role) return "Bahandisation";
  return {
    employee: t("employeeTitle"),
    report: t("reportTitle"),
    requests: t("requestsTitle"),
    manager: t("managerTitle"),
    analytics: t("analyticsTitle"),
    suppliers: t("suppliersTitle"),
    reports: t("reportsTitle"),
    executive: t("executiveTitle")
  }[view];
}

function syncChrome() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.language;
  document.body.classList.toggle("is-auth", !state.role);
  document.body.classList.toggle("is-menu-open", Boolean(state.role && state.menuOpen));
  document.title = t("brand");
  pageTitle.textContent = pageTitleFor(state.view);
  const visibleViews = state.role === "manager"
    ? ["manager", "requests", "analytics", "suppliers", "reports", "executive"]
    : ["employee", "report"];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-view]").forEach((node) => {
    const visible = Boolean(state.role) && visibleViews.includes(node.dataset.view);
    node.hidden = !visible;
    node.classList.toggle("is-active", node.dataset.view === state.view);
  });
  const languageSelect = document.querySelector("#languageSelect");
  if (languageSelect) languageSelect.value = state.language;
  const themeToggle = document.querySelector("#themeToggle");
  if (themeToggle) {
    themeToggle.textContent = state.theme === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", state.theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  const menuButton = document.querySelector("#menuButton");
  if (menuButton) {
    menuButton.hidden = !state.role;
    menuButton.setAttribute("aria-expanded", String(Boolean(state.role && state.menuOpen)));
    menuButton.setAttribute("aria-label", state.menuOpen ? "Close menu" : "Open menu");
  }
  if (state.health) {
    apiStatus.textContent = state.health.roboflowConfigured ? t("statusLive") : t("statusDemo");
    apiStatus.classList.toggle("is-live", state.health.roboflowConfigured);
    apiStatus.classList.toggle("is-demo", !state.health.roboflowConfigured);
  }
  const roleButton = document.querySelector("#roleButton");
  if (roleButton) {
    if (!state.role) {
      roleButton.textContent = state.language === "en" ? "Sign up" : state.language === "kz" ? "Тіркелу" : "Войти";
    } else {
      roleButton.textContent = state.language === "en" ? "Exit" : state.language === "kz" ? "Шығу" : "Выйти";
    }
  }
}

function setView(view) {
  if (state.role === "manager" && !["manager", "requests", "analytics", "suppliers", "reports", "executive"].includes(view)) view = "manager";
  if (state.role === "employee" && !["employee", "report"].includes(view)) view = "employee";
  state.view = view;
  state.menuOpen = false;
  syncChrome();
  render();
  app.focus({ preventScroll: true });
}

async function refreshData() {
  const [health, stores, reports, analytics] = await Promise.all([
    api("/api/health"),
    api("/api/stores"),
    api("/api/reports"),
    api("/api/analytics")
  ]);
  state.health = health;
  state.stores = stores;
  state.reports = reports;
  state.analytics = analytics;
  if (!state.form.branchId && stores[0]) {
    state.form.branchId = stores[0].id;
    state.form.branchName = stores[0].name;
  }
  if (!state.profile.branchId && state.form.branchId) {
    state.profile.branchId = state.form.branchId;
    state.profile.branchName = state.form.branchName;
  }
  syncChrome();
}

function metric(label, value, hint) {
  return `
    <article class="metric-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <p>${escapeHtml(hint || "")}</p>
    </article>
  `;
}

function renderAuth() {
  const employeeActive = state.authRole === "employee" ? "is-selected" : "";
  const managerActive = state.authRole === "manager" ? "is-selected" : "";
  const continueText = state.authRole === "manager" ? t("authManagerButton") : t("authEmployeeButton");
  app.innerHTML = `
    <section class="auth-shell">
      <div class="auth-form-panel">
        <div class="auth-logo">
          <span class="bahandi-logo"><span>BAHANDI</span></span>
          <strong>Bahandisation</strong>
        </div>
        <div>
          <span class="auth-kicker">Register / log in</span>
          <h2>${t("authCreateTitle")}</h2>
          <p>${t("authCreateText")}</p>
        </div>
        <div class="auth-role-control" aria-label="${t("authRoleLabel")}">
          <button class="${employeeActive}" type="button" data-action="choose-auth-role" data-role="employee">${t("authEmployeeTag")}</button>
          <button class="${managerActive}" type="button" data-action="choose-auth-role" data-role="manager">${t("authManagerTag")}</button>
        </div>
        <div class="auth-fields">
          <label class="form-row">
            <span class="form-label">${t("authFirstName")}</span>
            <input class="field" data-auth-field="firstName" value="${escapeHtml(state.auth.firstName)}" />
          </label>
          <label class="form-row">
            <span class="form-label">${t("authLastName")}</span>
            <input class="field" data-auth-field="lastName" value="${escapeHtml(state.auth.lastName)}" />
          </label>
          <label class="form-row full">
            <span class="form-label">${t("authEmail")}</span>
            <input class="field" type="email" data-auth-field="email" value="${escapeHtml(state.auth.email)}" />
          </label>
          <label class="form-row full">
            <span class="form-label">${t("password")}</span>
            <input class="field" type="password" data-auth-field="password" value="${escapeHtml(state.auth.password)}" />
          </label>
          <label class="form-row full">
            <span class="form-label">${state.authRole === "manager" ? t("authManagerZone") : t("authBranchName")}</span>
            <input class="field" value="${state.authRole === "manager" ? "All branches" : "Bahandi Шахтеров"}" />
          </label>
        </div>
        <button class="auth-submit" type="button" data-action="enter-selected-role">${continueText}</button>
        <p class="auth-footnote">${t("authAccountHint")} <button type="button" data-action="enter-selected-role">${t("authSignIn")}</button></p>
      </div>
      <div class="auth-visual" aria-hidden="true">
        <div class="auth-visual-card">
          <span>Bahandi AI Ops</span>
          <strong>${t("authHeroTitle")}</strong>
          <p>${t("authHeroText")}</p>
        </div>
        <div class="burger-stage">
          <span class="burger-scroll-label">Scroll to inspect layers</span>
          <div class="burger-stack">
            <span class="burger-layer bun-top"><i></i><i></i><i></i></span>
            <span class="burger-layer lettuce"></span>
            <span class="burger-layer tomato"></span>
            <span class="burger-layer cheese"></span>
            <span class="burger-layer onion"></span>
            <span class="burger-layer patty"></span>
            <span class="burger-layer bun-bottom"></span>
          </div>
          <div class="burger-layer-notes">
            <span>photo</span>
            <span>AI product</span>
            <span>quantity</span>
            <span>reason</span>
          </div>
        </div>
      </div>
    </section>
  `;
  updateBurgerScene();
}

function renderEmployee() {
  const recent = state.reports.slice(0, 6);
  const employeeName = `${state.auth.firstName} ${state.auth.lastName}`.trim() || "Bahandi worker";
  const currentStore = state.stores.find((store) => store.id === state.form.branchId);
  app.innerHTML = `
    <section class="worker-layout">
      <div class="worker-profile glass-panel">
        <span class="soft-label">${t("workerProfile")}</span>
        <div class="worker-avatar">${escapeHtml(employeeName.slice(0, 1).toUpperCase())}</div>
        <h2>${escapeHtml(employeeName)}</h2>
        <label class="form-row">
          <span class="form-label">${t("workerTitle")}</span>
          <input class="field" data-profile-field="title" value="${escapeHtml(state.profile.title)}" />
        </label>
        <label class="form-row">
          <span class="form-label">${t("workerPoint")}</span>
          <select class="field" data-field="branchId">${storeOptions()}</select>
        </label>
        <div class="button-row">
          <button class="primary-button" type="button" data-action="save-profile">${t("workerSave")}</button>
          <button class="secondary-button" type="button" data-action="open-report">${t("workerOpenIssue")}</button>
        </div>
        <p class="worker-note">${t("workerHint")}</p>
      </div>

      <div class="worker-main">
        <div class="hero-action glass-hero">
          <div>
            <p class="eyebrow">Bahandi AI Ops</p>
            <h2>${t("heroTitle")}</h2>
          </div>
          <p>${t("heroText")}</p>
          <div class="button-row">
            <button class="primary-button large-cta" type="button" data-action="open-report">${t("workerOpenIssue")}</button>
            <button class="secondary-button" type="button" data-action="sample-report">${t("demoPhoto")}</button>
          </div>
        </div>

        <div class="grid three profile-stats">
          ${metric(t("reportsToday"), state.analytics.submitted || 0, t("allWriteoffs"))}
          ${metric(t("pending"), state.analytics.pending || 0, t("managerQueue"))}
          ${metric("AI confidence", `${state.analytics.averageConfidence || 0}%`, t("avgConfidence"))}
        </div>

        <section class="panel glass-panel">
          <div class="section-head">
            <h2>${t("workerHistory")}</h2>
            <span class="tag">${escapeHtml(currentStore?.name || state.form.branchName || "Bahandi")}</span>
          </div>
          ${recent.length ? renderReportList(recent, false) : `<div class="empty-state">${t("noReports")}</div>`}
        </section>

        <section class="panel glass-panel insight-panel">
          <h2>${t("aiCoach")}</h2>
          <div class="detection-card">
            <span class="tag">AI Ops</span>
            <strong>${t("coachTitle")}</strong>
            <p>${t("coachText")}</p>
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderPersonal() {
  renderEmployee();
}

function renderQuickAssistant() {
  return `
    <div class="quick-assistant">
      <span class="soft-label">${t("reportAssistant")}</span>
      <p>${t("reportAssistantText")}</p>
    </div>
  `;
}

function renderStatusList(items) {
  return `
    <div class="status-list">
      ${items
        .map(
          (item) => `
            <article>
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.value)}</span>
              <p>${escapeHtml(item.hint)}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderManagerProfileCards() {
  return renderStatusList([
    { title: t("pendingRequests"), value: String(state.analytics.pending || 0), hint: t("managerQueue") },
    { title: t("approval"), value: `${state.analytics.approvalRate || 0}%`, hint: t("approved") },
    { title: t("prevented"), value: money(state.analytics.preventedLosses || 0), hint: "18% modeled saving" },
    { title: t("corrections"), value: `${state.analytics.correctionRate || 0}%`, hint: t("employeeCorrections") }
  ]);
}

function storeOptions() {
  return state.stores
    .map((store) => {
      const selected = store.id === state.form.branchId ? "selected" : "";
      return `<option value="${escapeHtml(store.id)}" ${selected}>${escapeHtml(store.name)} · ${escapeHtml(store.city)}</option>`;
    })
    .join("");
}

function productSelect() {
  return productOptions
    .map((product) => {
      const selected = product === state.form.product ? "selected" : "";
      return `<option value="${escapeHtml(product)}" ${selected}>${escapeHtml(productLabel(product))}</option>`;
    })
    .join("");
}

function employeeSelect() {
  return employeeOptions
    .map((employee) => {
      const selected = employee === state.form.deductionEmployee ? "selected" : "";
      return `<option value="${escapeHtml(employee)}" ${selected}>${escapeHtml(employee)}</option>`;
    })
    .join("");
}

function reasonButtons() {
  const options = reasonValues
    .map((value) => {
      const active = state.form.reason === value ? "is-selected" : "";
      return `<button class="reason-option ${active}" type="button" data-reason="${escapeHtml(value)}">${escapeHtml(reasonLabel(value))}</button>`;
    })
    .join("");

  return `
    <div class="reason-picker ${state.reasonOpen ? "is-open" : ""}">
      <button class="reason-trigger" type="button" data-action="toggle-reason">
        <span>${escapeHtml(reasonLabel(state.form.reason))}</span>
        <strong>⌄</strong>
      </button>
      <div class="reason-menu">${options}</div>
    </div>
  `;
}

function renderBoundingBoxes() {
  const boxes = state.detection?.boundingBoxes || [];
  if (!boxes.length) return "";
  return boxes
    .map((box, index) => {
      const width = Math.max(8, (Number(box.width || 0) / Number(box.imageWidth || 640)) * 100);
      const height = Math.max(8, (Number(box.height || 0) / Number(box.imageHeight || 420)) * 100);
      const left = Math.max(0, Math.min(92, ((Number(box.x || 0) - Number(box.width || 0) / 2) / Number(box.imageWidth || 640)) * 100));
      const top = Math.max(0, Math.min(92, ((Number(box.y || 0) - Number(box.height || 0) / 2) / Number(box.imageHeight || 420)) * 100));
      return `<div class="bbox" style="left:${left}%;top:${top}%;width:${width}%;height:${height}%"><span>#${index + 1}</span></div>`;
    })
    .join("");
}

function renderImageInput() {
  if (state.image) {
    return `
      <div class="preview">
        <img src="${state.image}" alt="${escapeHtml(t("photoTitle"))}" />
        ${renderBoundingBoxes()}
      </div>
      <div class="button-row compact-row">
        <button class="secondary-button" type="button" data-action="clear-image">${t("replacePhoto")}</button>
        <label class="secondary-button file-button">
          <input id="cameraInput" type="file" accept="image/*" capture="environment" />
          <span>${t("capturePhoto")}</span>
        </label>
        <label class="secondary-button file-button">
          <input id="galleryInput" type="file" accept="image/*" />
          <span>${t("chooseGallery")}</span>
        </label>
        <button class="secondary-button" type="button" data-action="use-sample">${t("demoPhoto")}</button>
      </div>
    `;
  }
  return `
    <div class="upload-zone upload-panel">
      <strong>${t("uploadTitle")}</strong>
      <span>${t("uploadHint")}</span>
      <div class="upload-actions">
        <label class="upload-action">
          <input id="cameraInput" type="file" accept="image/*" capture="environment" />
          <span>${t("capturePhoto")}</span>
        </label>
        <label class="upload-action">
          <input id="galleryInput" type="file" accept="image/*" />
          <span>${t("chooseGallery")}</span>
        </label>
      </div>
    </div>
    <div class="button-row compact-row upload-secondary-row">
      <button class="secondary-button" type="button" data-action="use-sample">${t("demoPhoto")}</button>
    </div>
  `;
}

function detectionNarrative() {
  if (!state.detection) return "";
  if (state.detection.requiresApiKey) return t("roboflowNeedsKey");
  if (!state.detection.detectedProduct) return t("aiNoProduct");
  const product = productLabel(state.detection.detectedProduct);
  const quantity = Number(state.detection.quantity || state.detection.objectCount || 1);
  return t("narrativeFound", { product, quantity });
}

function renderDetection() {
  if (state.loading) {
    return `
      <div class="loading-box">
        <div class="loader" aria-hidden="true"></div>
        <strong>${t("analyzing")}</strong>
        <span>${t("analyzingHint")}</span>
      </div>
    `;
  }
  if (!state.detection) {
    return `<div class="empty-state">${t("detectionEmpty")}</div>`;
  }
  const sourceLabel = state.detection.source || "Bahandisation API";
  return `
    <div class="detection-card detection-result">
      <div class="detection-top">
        <div>
          <span class="tag">${escapeHtml(sourceLabel)}</span>
          <div class="detected-name">${escapeHtml(productLabel(state.detection.detectedProduct) || t("manualMode"))}</div>
          <p>${escapeHtml(state.detection.quantity || 0)} ${t("units")} · ${escapeHtml(state.detection.objectCount || 0)} objects</p>
        </div>
        <div class="confidence-value">${escapeHtml(state.detection.confidence || 0)}%</div>
      </div>
      <div class="ai-text-output">
        <span>${t("detectedTextTitle")}</span>
        <strong>${escapeHtml(detectionNarrative())}</strong>
      </div>
      <div class="confidence-bar" style="--confidence:${Number(state.detection.confidence || 0)}%"><span></span></div>
      <div class="button-row compact-row">
        <button class="primary-button" type="button" data-action="confirm-detection" ${state.detection.detectedProduct ? "" : "disabled"}>${t("confirm")}</button>
        <button class="secondary-button" type="button" data-action="edit-detection">${t("edit")}</button>
      </div>
      ${
        state.detection.detectedProducts?.length
          ? `<div class="bar-list">${state.detection.detectedProducts
              .map(
                (item) => `
                  <div class="bar-row">
                    <header><span>${escapeHtml(productLabel(item.name))}</span><span>${item.quantity} ${t("units")} · ${item.confidence}%</span></header>
                    <div class="bar-track"><span style="--width:${item.confidence}%"></span></div>
                  </div>`
              )
              .join("")}</div>`
          : ""
      }
    </div>
  `;
}

function renderReport() {
  app.innerHTML = `
    <section class="report-flow">
      <div class="panel">
        <h2>${t("photoTitle")}</h2>
        ${renderImageInput()}
      </div>
      <div class="grid">
        <div class="panel">
          <div class="section-head">
            <h2>Bahandisation API</h2>
            <button class="primary-button" type="button" data-action="analyze" ${state.image && !state.loading ? "" : "disabled"}>${t("analyze")}</button>
          </div>
          ${renderQuickAssistant()}
          <div style="margin-top:14px">${renderDetection()}</div>
        </div>
        <div class="panel">
          <h2>${t("finalReport")}</h2>
          <div class="form-grid">
            <label class="form-row full">
              <span class="form-label">${t("branch")}</span>
              <select class="field" data-field="branchId">${storeOptions()}</select>
            </label>
            <label class="form-row">
              <span class="form-label">${t("product")}</span>
              <select class="field" data-field="product">
                <option value="">${t("chooseManual")}</option>
                ${productSelect()}
              </select>
            </label>
            <label class="form-row">
              <span class="form-label">${t("quantity")}</span>
              <div class="quantity-stepper">
                <button type="button" data-action="dec-qty">−</button>
                <input class="field" type="number" min="1" data-field="quantity" value="${escapeHtml(state.form.quantity)}" />
                <button type="button" data-action="inc-qty">+</button>
              </div>
            </label>
            <div class="form-row full">
              <span class="form-label">${t("reason")}</span>
              <div class="reason-field">${reasonButtons()}</div>
            </div>
            <label class="form-row">
              <span class="form-label">${t("writeoffType")}</span>
              <select class="field" data-field="deductionType">
                <option value="without_deduction" ${state.form.deductionType === "without_deduction" ? "selected" : ""}>${t("withoutDeduction")}</option>
                <option value="with_deduction" ${state.form.deductionType === "with_deduction" ? "selected" : ""}>${t("withDeduction")}</option>
              </select>
            </label>
            <label class="form-row">
              <span class="form-label">${t("employee")}</span>
              <select class="field" data-field="deductionEmployee" ${state.form.deductionType === "with_deduction" ? "" : "disabled"}>
                <option value="">${t("notSelected")}</option>
                ${employeeSelect()}
              </select>
            </label>
            <label class="form-row full">
              <span class="form-label">${t("comment")}</span>
              <textarea class="textarea" data-field="comment" placeholder="${t("commentPlaceholder")}">${escapeHtml(state.form.comment)}</textarea>
            </label>
          </div>
          <div class="button-row compact-row">
            <button class="primary-button" type="button" data-action="submit-report" ${state.submitting ? "disabled" : ""}>${t("submit")}</button>
            <button class="secondary-button" type="button" data-action="manual-mode">${t("manualMode")}</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function statusBadge(status) {
  const labels = { pending: t("pending"), approved: t("approved"), rejected: t("rejected") };
  return `<span class="state-badge ${escapeHtml(status)}">${labels[status] || status}</span>`;
}

function renderReportList(reports, withActions) {
  return `
    <div class="report-list">
      ${reports
        .map((report) => {
          const final = report.finalEmployeeCorrection || {};
          const confidence = report.aiPrediction?.confidence || 0;
          return `
            <article class="report-card">
              ${
                report.originalImage
                  ? `<img src="${report.originalImage}" alt="${escapeHtml(t("photoTitle"))}" />`
                  : `<div style="width:96px;height:76px;border-radius:7px;background:var(--line)"></div>`
              }
              <div>
                <h3>${escapeHtml(productLabel(final.product) || final.product || "Manual")} · ${escapeHtml(final.quantity || 1)} ${t("units")}</h3>
                <p>${escapeHtml(final.branchName || "Bahandi")} · ${dateTime(report.createdAt)} · AI ${confidence}%</p>
                ${statusBadge(report.status)}
                ${report.correctionApplied ? `<span class="tag">${t("corrections")}</span>` : ""}
              </div>
              ${
                withActions && report.status === "pending"
                  ? `<div class="report-actions">
                      <button class="small-button" type="button" data-action="approve-report" data-id="${report.id}">${t("approved")}</button>
                      <button class="small-button" type="button" data-action="reject-report" data-id="${report.id}">${t("rejected")}</button>
                    </div>`
                  : ""
              }
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function supplierCard(name, rating, complaints, losses) {
  return `
    <article class="supplier-card">
      <strong>${escapeHtml(name)}</strong>
      <p>Rating ${rating}/100</p>
      <p>${complaints} ${t("complaints")}</p>
      <span class="tag">${money(losses)}</span>
    </article>
  `;
}

function renderManager() {
  app.innerHTML = `
    <section class="manager-hero glass-panel">
      <div>
        <span class="soft-label">${t("navManagerProfile")}</span>
        <h2>${escapeHtml(`${state.auth.firstName} ${state.auth.lastName}`.trim() || "Manager")}</h2>
        <p>${t("managerProfileText")}</p>
      </div>
      <button class="primary-button" type="button" data-view="requests">${t("pendingRequests")}</button>
    </section>
    <section class="grid four manager-kpis">
      ${metric(t("losses"), money(state.analytics.totalLoss || 0), t("allRequests"))}
      ${metric(t("pending"), state.analytics.pending || 0, t("managerQueue"))}
      ${metric(t("approval"), `${state.analytics.approvalRate || 0}%`, t("approved"))}
      ${metric(t("prevented"), money(state.analytics.preventedLosses || 0), "AI Ops")}
    </section>
    <section class="grid two" style="margin-top:18px">
      <div class="panel glass-panel">
        <h2>${t("controlCenter")}</h2>
        ${renderManagerProfileCards()}
      </div>
      <div class="panel glass-panel">
        <h2>${t("rootCause")}</h2>
        ${renderStatusList([
          { title: "FreshFood tomatoes", value: "42%", hint: "More spoilage 3-4 days after delivery." },
          { title: "Evening buns", value: "+31%", hint: "Losses grow after 19:00 on high-load shifts." },
          { title: "Karaganda point", value: "+65%", hint: "Above average waste this week." }
        ])}
      </div>
    </section>
  `;
}

function renderRequests() {
  const pending = state.reports.filter((report) => report.status === "pending");
  const approved = state.reports.filter((report) => report.status === "approved");
  app.innerHTML = `
    <section class="grid two">
      <div class="panel glass-panel">
        <h2>${t("approvalQueue")}</h2>
        ${pending.length ? renderReportList(pending, true) : `<div class="empty-state">${t("noPending")}</div>`}
      </div>
      <div class="panel glass-panel">
        <h2>${t("approvedTable")}</h2>
        ${approved.length ? renderReportList(approved.slice(0, 8), false) : `<div class="empty-state">${t("historyEmpty")}</div>`}
      </div>
    </section>
    <section class="panel glass-panel" style="margin-top:18px">
      <h2>${t("history")}</h2>
      ${state.reports.length ? renderReportList(state.reports, false) : `<div class="empty-state">${t("historyEmpty")}</div>`}
    </section>
  `;
}

function renderHeatMap() {
  const branches = [
    { name: "Шахтеров", level: "high", loss: "65%" },
    { name: "Mega", level: "medium", loss: "31%" },
    { name: "Arbat", level: "low", loss: "12%" },
    { name: "Dostyk", level: "low", loss: "9%" },
    { name: "Airport", level: "medium", loss: "28%" },
    { name: "Central", level: "high", loss: "58%" }
  ];
  return `
    <div class="heat-grid">
      ${branches.map((branch) => `<span class="${branch.level}"><strong>${escapeHtml(branch.name)}</strong><small>${branch.loss}</small></span>`).join("")}
    </div>
  `;
}

function renderSuppliers() {
  app.innerHTML = `
    <section class="grid two">
      <div class="panel glass-panel">
        <h2>${t("supplierQuality")}</h2>
        <div class="supplier-grid">
          ${supplierCard("FreshFood", 58, 35, 480000)}
          ${supplierCard("AgroLine", 84, 9, 126000)}
          ${supplierCard("Baker Pro", 76, 14, 168000)}
          ${supplierCard("Qazaq Dairy", 96, 4, 35000)}
        </div>
      </div>
      <div class="panel glass-panel">
        <h2>AI supplier advice</h2>
        ${renderStatusList([
          { title: "FreshFood", value: "High risk", hint: "More photo complaints: rot, damaged packaging, weak maturity." },
          { title: "Baker Pro", value: "Watch", hint: "Bun breakage is higher during morning delivery." },
          { title: "Qazaq Dairy", value: "Stable", hint: "Low complaint rate and strong approval quality." }
        ])}
      </div>
    </section>
  `;
}

function renderReportsCenter() {
  const periods = [
    ["today", t("pdfToday")],
    ["week", t("pdfWeek")],
    ["month", t("pdfMonth")],
    ["quarter", t("pdfQuarter")],
    ["year", t("pdfYear")],
    ["iiko", t("pdfIiko")]
  ];
  app.innerHTML = `
    <section class="panel glass-panel">
      <h2>${t("reportsTitle")}</h2>
      <div class="report-period-grid">
        ${periods
          .map(
            ([period, label]) => `
              <a class="report-period-card" href="/api/reports/pdf?period=${period}" target="_blank" rel="noreferrer">
                <strong>${escapeHtml(label)}</strong>
                <span>${t("downloadPdf")}</span>
              </a>
            `
          )
          .join("")}
      </div>
    </section>
    <section class="panel glass-panel" style="margin-top:18px">
      <h2>${t("approvedTable")}</h2>
      ${state.reports.length ? renderReportList(state.reports, false) : `<div class="empty-state">${t("historyEmpty")}</div>`}
    </section>
  `;
}

function renderExecutive() {
  app.innerHTML = `
    <section class="executive-layout">
      <div class="manager-hero glass-panel">
        <div>
          <span class="soft-label">${t("executiveTitle")}</span>
          <h2>${money(state.analytics.totalLoss || 0)}</h2>
          <p>Main AI insight: losses are concentrated in buns, tomatoes, and evening preparation errors.</p>
        </div>
        <strong class="executive-saving">${money(state.analytics.preventedLosses || 0)}</strong>
      </div>
      <div class="grid three">
        ${metric(t("approval"), `${state.analytics.approvalRate || 0}%`, t("approved"))}
        ${metric(t("corrections"), `${state.analytics.correctionRate || 0}%`, t("employeeCorrections"))}
        ${metric(t("forecast"), "+12%", "Projected next week without intervention")}
      </div>
      <section class="grid two" style="margin-top:18px">
        <div class="panel glass-panel"><h2>${t("heatMap")}</h2>${renderHeatMap()}</div>
        <div class="panel glass-panel"><h2>${t("rootCause")}</h2>${renderStatusList([
          { title: "Prevented losses", value: money(state.analytics.preventedLosses || 0), hint: "Estimated savings after manager approval." },
          { title: "Top employee badge", value: "Нурбек К.", hint: "Fast confirmations, low correction rate." },
          { title: "Supplier action", value: "FreshFood", hint: "Request quality review and photo evidence." }
        ])}</div>
      </section>
    </section>
  `;
}

function correctionBars() {
  const entries = Object.entries(state.analytics.productCorrections || {}).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return `<div class="empty-state">${t("noCorrections")}</div>`;
  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  return `<div class="bar-list">${entries
    .map(
      ([product, count]) => `
        <div class="bar-row">
          <header><span>${escapeHtml(productLabel(product))}</span><span>${count}</span></header>
          <div class="bar-track"><span style="--width:${Math.round((count / max) * 100)}%"></span></div>
        </div>`
    )
    .join("")}</div>`;
}

function lossBars() {
  const entries = Object.entries(state.analytics.productLosses || {}).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return `<div class="empty-state">${t("noLosses")}</div>`;
  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  return `<div class="bar-list">${entries
    .map(
      ([product, value]) => `
        <div class="bar-row">
          <header><span>${escapeHtml(productLabel(product))}</span><span>${money(value)}</span></header>
          <div class="bar-track"><span style="--width:${Math.round((value / max) * 100)}%"></span></div>
        </div>`
    )
    .join("")}</div>`;
}

function renderAnalytics() {
  app.innerHTML = `
    <section class="grid five">
      ${metric("AI confidence", `${state.analytics.averageConfidence || 0}%`, t("avgConfidence"))}
      ${metric(t("corrections"), state.analytics.employeeCorrections || 0, t("employeeCorrections"))}
      ${metric(t("approval"), `${state.analytics.approvalRate || 0}%`, t("navManager"))}
      ${metric(t("falseDetections"), state.analytics.falseDetections || 0, t("lowOrCorrection"))}
      ${metric(t("objectCount"), state.reports.reduce((total, report) => total + Number(report.aiPrediction?.objectCount || 0), 0), t("allPhotos"))}
    </section>
    <section class="grid two" style="margin-top:18px">
      <div class="panel"><h2>${t("employeeCorrections")}</h2>${correctionBars()}</div>
      <div class="panel"><h2>${t("productLosses")}</h2>${lossBars()}</div>
    </section>
    <section class="grid two" style="margin-top:18px">
      <div class="panel glass-panel"><h2>${t("heatMap")}</h2>${renderHeatMap()}</div>
      <div class="panel glass-panel"><h2>${t("forecast")}</h2>${renderStatusList([
        { title: "Next week", value: "+12%", hint: "Predicted if evening bun waste stays unchanged." },
        { title: "Potential saving", value: money(430000), hint: "Training and supplier action scenario." },
        { title: "False detections", value: String(state.analytics.falseDetections || 0), hint: t("lowOrCorrection") }
      ])}</div>
    </section>
    <section class="panel glass-panel" style="margin-top:18px">
      <h2>${t("aiDashboard")}</h2>
      <div class="detection-card">
        <span class="tag">Bahandisation API</span>
        <strong>${t("analyticsText")}</strong>
      </div>
    </section>
  `;
}

function render() {
  syncChrome();
  if (!state.role) {
    renderAuth();
    return;
  }
  if (state.view === "employee") renderEmployee();
  if (state.view === "report") renderReport();
  if (state.view === "personal") renderPersonal();
  if (state.view === "manager") renderManager();
  if (state.view === "requests") renderRequests();
  if (state.view === "analytics") renderAnalytics();
  if (state.view === "suppliers") renderSuppliers();
  if (state.view === "reports") renderReportsCenter();
  if (state.view === "executive") renderExecutive();
}

function createSampleImage() {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 420;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f6f1e7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#13261d";
  ctx.fillRect(54, 54, 532, 312);
  ctx.fillStyle = "#fffaf0";
  ctx.fillRect(74, 74, 492, 272);
  ctx.fillStyle = "#d69c32";
  for (let i = 0; i < 18; i += 1) {
    const x = 112 + (i % 9) * 22;
    const y = 112 + Math.floor(i / 9) * 34;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((i % 5) * 0.16);
    ctx.fillRect(-5, -38, 10, 88);
    ctx.restore();
  }
  function patty(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, 74, 55, -0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#7d3f1d";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    ctx.beginPath();
    ctx.ellipse(x - 20, y - 14, 22, 10, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  patty(268, 166, "#9b5528");
  patty(420, 176, "#8e4a22");
  ctx.strokeStyle = "#e2c96f";
  ctx.lineWidth = 13;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.ellipse(278 + i * 54, 282, 31, 22, i * 0.2, 0, Math.PI * 2);
    ctx.stroke();
  }
  return canvas.toDataURL("image/png");
}

function useSampleImage() {
  state.image = createSampleImage();
  state.imageName = "demo-food-tray.png";
  state.detection = null;
  state.draftId = "";
  setView("report");
  window.setTimeout(analyzeImage, 0);
}

async function handleFile(file) {
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) {
    showToast(t("fileLarge"));
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    state.image = String(reader.result || "");
    state.imageName = file.name;
    state.detection = null;
    state.draftId = "";
    render();
    analyzeImage();
  };
  reader.readAsDataURL(file);
}

async function analyzeImage() {
  if (!state.image) {
    showToast(t("addPhotoToAnalyze"));
    return;
  }
  state.loading = true;
  render();
  try {
    const result = await api("/api/bahandisation/analyze", {
      method: "POST",
      body: JSON.stringify({
        image: state.image,
        branchId: state.form.branchId,
        language: state.language
      })
    });
    state.draftId = result.draftId;
    state.detection = result;
    if (result.detectedProduct) state.form.product = result.detectedProduct;
    if (result.quantity) state.form.quantity = result.quantity;
    showToast(result.requiresApiKey ? t("roboflowNeedsKey") : !result.detectedProduct ? t("aiNoProduct") : t("aiReady"));
  } catch (error) {
    state.detection = {
      source: "manual_fallback",
      detectedProduct: "",
      quantity: 1,
      confidence: 0,
      objectCount: 0,
      detectedProducts: [],
      boundingBoxes: [],
      lowConfidence: true,
      error: error.message
    };
    showToast(t("aiUnavailable"));
  } finally {
    state.loading = false;
    render();
  }
}

function confirmDetection() {
  if (!state.detection) return;
  if (state.detection.detectedProduct) state.form.product = state.detection.detectedProduct;
  if (state.detection.quantity) state.form.quantity = state.detection.quantity;
  showToast(t("aiConfirmed"));
  render();
}

function enableManualMode() {
  state.detection = state.detection || {
    source: "manual",
    confidence: 0,
    detectedProduct: "",
    quantity: state.form.quantity,
    lowConfidence: true,
    detectedProducts: [],
    boundingBoxes: []
  };
  showToast(t("manualEnabled"));
  render();
}

async function submitReport() {
  if (!state.image) {
    showToast(t("addPhoto"));
    return;
  }
  if (!state.form.product) {
    showToast(t("chooseProduct"));
    return;
  }
  if (String(state.form.comment || "").trim().length < 10) {
    showToast(t("commentMin"));
    return;
  }
  const store = state.stores.find((item) => item.id === state.form.branchId);
  state.submitting = true;
  render();
  try {
    await api("/api/reports", {
      method: "POST",
      body: JSON.stringify({
        ...state.form,
        branchName: store?.name || state.form.branchName,
        image: state.image,
        draftId: state.draftId,
        aiPrediction: state.detection
      })
    });
    state.image = "";
    state.imageName = "";
    state.detection = null;
    state.draftId = "";
    state.form.product = "";
    state.form.quantity = 1;
    state.form.comment = "";
    await refreshData();
    setView(state.role === "manager" ? "manager" : "employee");
    showToast(t("reportSent"));
  } catch (error) {
    showToast(error.message);
  } finally {
    state.submitting = false;
    render();
  }
}

async function updateReportStatus(id, status) {
  await api(`/api/reports/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
  await refreshData();
  render();
  showToast(status === "approved" ? t("approvedToast") : t("rejectedToast"));
}

function updateField(field, value) {
  if (field === "quantity") {
    state.form.quantity = Math.max(1, Number(value || 1));
    return;
  }
  state.form[field] = value;
  if (field === "branchId") {
    const store = state.stores.find((item) => item.id === value);
    state.form.branchName = store?.name || "";
  }
}

function updateBurgerScene() {
  const shell = document.querySelector(".auth-shell");
  const maxScroll = shell
    ? Math.max(1, shell.scrollHeight - window.innerHeight)
    : Math.max(1, window.innerHeight);
  const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
  document.documentElement.style.setProperty("--burger-progress", progress.toFixed(3));
  document.documentElement.style.setProperty("--burger-rotate", `${Math.round(progress * 52)}deg`);
}

window.addEventListener("scroll", updateBurgerScene, { passive: true });

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    setView(viewButton.dataset.view);
    return;
  }
  const reasonButton = event.target.closest("[data-reason]");
  if (reasonButton) {
    state.form.reason = reasonButton.dataset.reason;
    state.reasonOpen = false;
    render();
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "toggle-menu") {
    state.menuOpen = !state.menuOpen;
    syncChrome();
    return;
  }
  if (action === "close-menu") {
    state.menuOpen = false;
    syncChrome();
    return;
  }
  if (action === "choose-auth-role") {
    state.authRole = actionButton.dataset.role || "employee";
    render();
    return;
  }
  if (action === "enter-selected-role" || action === "enter-employee" || action === "enter-manager") {
    if (action === "enter-manager") state.authRole = "manager";
    if (action === "enter-employee") state.authRole = "employee";
    if (!String(state.auth.email || "").includes("@") || String(state.auth.password || "").length < 4) {
      showToast(t("authMissing"));
      return;
    }
    state.role = state.authRole === "manager" ? "manager" : "employee";
    localStorage.setItem(ROLE_STORAGE_KEY, state.role);
    setView(state.role === "manager" ? "manager" : "employee");
    return;
  }
  if (action === "logout") {
    state.role = "";
    state.menuOpen = false;
    localStorage.removeItem(ROLE_STORAGE_KEY);
    render();
    return;
  }
  if (action === "toggle-reason") {
    state.reasonOpen = !state.reasonOpen;
    render();
    return;
  }
  if (action === "save-profile") {
    const store = state.stores.find((item) => item.id === state.form.branchId);
    state.profile.branchId = state.form.branchId;
    state.profile.branchName = store?.name || state.form.branchName;
    showToast(t("profileSaved"));
    render();
    return;
  }
  if (action === "open-report") setView("report");
  if (action === "sample-report" || action === "use-sample") useSampleImage();
  if (action === "clear-image") {
    state.image = "";
    state.imageName = "";
    state.detection = null;
    state.draftId = "";
    render();
  }
  if (action === "analyze") analyzeImage();
  if (action === "confirm-detection") confirmDetection();
  if (action === "edit-detection" || action === "manual-mode") enableManualMode();
  if (action === "inc-qty") {
    state.form.quantity += 1;
    render();
  }
  if (action === "dec-qty") {
    state.form.quantity = Math.max(1, state.form.quantity - 1);
    render();
  }
  if (action === "submit-report") submitReport();
  if (action === "approve-report") updateReportStatus(actionButton.dataset.id, "approved");
  if (action === "reject-report") updateReportStatus(actionButton.dataset.id, "rejected");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.menuOpen) {
    state.menuOpen = false;
    syncChrome();
  }
});

document.addEventListener("change", (event) => {
  if (["imageInput", "cameraInput", "galleryInput"].includes(event.target.id)) {
    handleFile(event.target.files?.[0]);
    return;
  }
  if (event.target.id === "languageSelect") {
    state.language = event.target.value;
    localStorage.setItem("wasteiq-language", state.language);
    syncChrome();
    render();
    return;
  }
  const field = event.target.dataset.field;
  if (field) {
    updateField(field, event.target.value);
    render();
  }
});

document.addEventListener("input", (event) => {
  const authField = event.target.dataset.authField;
  if (authField) {
    state.auth[authField] = event.target.value;
    return;
  }
  const profileField = event.target.dataset.profileField;
  if (profileField) {
    state.profile[profileField] = event.target.value;
    return;
  }
  const field = event.target.dataset.field;
  if (field) updateField(field, event.target.value);
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("wasteiq-theme", state.theme);
  syncChrome();
});

async function init() {
  try {
    await refreshData();
  } catch (error) {
    showToast(error.message);
  }
  if (state.role === "manager") state.view = "manager";
  if (state.role === "employee") state.view = "employee";
  if (!state.role) state.view = "employee";
  render();
}

init();
