export type DesignEntry = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  family: string;
  status: "live" | "queued";
  tags: string[];
  preview: string;
  href?: string;
};

export const families = ["全部", "沉浸体验", "编辑排版", "极简产品", "未来界面", "品牌叙事", "数据密集", "复古数字", "自然有机", "商业转化", "趣味实验"];

export const designs: DesignEntry[] = [
  { id: "001", slug: "001-lumen", title: "Lumen Micro Journey", subtitle: "用一束光探索一分钟的远方", family: "沉浸体验", status: "live", tags: ["暗色", "探索", "情绪体验"], preview: "lumen", href: "/designs/001-lumen" },
  { id: "002", slug: "002-editorial-grid", title: "Editorial Grid", subtitle: "高密度杂志式产品发布页", family: "编辑排版", status: "queued", tags: ["网格", "衬线体", "留白"], preview: "editorial" },
  { id: "003", slug: "003-quiet-saas", title: "Quiet SaaS", subtitle: "安静、可信、低噪音的工具首页", family: "极简产品", status: "queued", tags: ["SaaS", "克制", "信任"], preview: "quiet" },
  { id: "004", slug: "004-orbit-console", title: "Orbit Console", subtitle: "空间感强烈的未来控制台", family: "未来界面", status: "queued", tags: ["HUD", "空间", "动效"], preview: "orbit" },
  { id: "005", slug: "005-founders-note", title: "Founder’s Note", subtitle: "以人物声音驱动的品牌叙事", family: "品牌叙事", status: "queued", tags: ["故事", "人物", "长文"], preview: "founder" },
  { id: "006", slug: "006-signal-room", title: "Signal Room", subtitle: "高密度情报与趋势工作台", family: "数据密集", status: "queued", tags: ["Dashboard", "数据", "效率"], preview: "signal" },
  { id: "007", slug: "007-pixel-office", title: "Pixel Office", subtitle: "九十年代桌面式协作产品", family: "复古数字", status: "queued", tags: ["像素", "桌面", "怀旧"], preview: "pixel" },
  { id: "008", slug: "008-moss-library", title: "Moss Library", subtitle: "自然材料感的知识收藏馆", family: "自然有机", status: "queued", tags: ["纸张", "自然", "收藏"], preview: "moss" },
  { id: "009", slug: "009-proof-first", title: "Proof First", subtitle: "证据优先的高转化服务页", family: "商业转化", status: "queued", tags: ["转化", "案例", "信任"], preview: "proof" },
  { id: "010", slug: "010-tiny-planet", title: "Tiny Planet", subtitle: "玩具般轻快的互动工具", family: "趣味实验", status: "queued", tags: ["游戏感", "3D", "轻量"], preview: "planet" },
];
