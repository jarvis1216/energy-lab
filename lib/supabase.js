/**
 * HerbLab · Supabase 客户端初始化
 *
 * ① 前往 https://supabase.com 创建项目
 * ② 将下方两个占位符替换为你的真实凭证
 *    SUPABASE_URL     → Project Settings > API > Project URL
 *    SUPABASE_ANON_KEY → Project Settings > API > anon / public key
 *
 * ③ 在 Supabase SQL Editor 中执行以下建表语句：
 * ─────────────────────────────────────────────────────
 * CREATE TABLE energy_lab_records (
 *   id             uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
 *   created_at     timestamptz DEFAULT now(),
 *
 *   -- 用户基础信息
 *   gender         text,
 *   birth_year     int,
 *   birth_month    int,
 *   birth_day      int,
 *   birth_shichen  int,
 *   age            int,
 *
 *   -- 雷达图五维得分（能量值，越高越充盈）
 *   dim_career     int,   -- 事业气场
 *   dim_emotion    int,   -- 情绪韧性
 *   dim_social     int,   -- 人际磁场
 *   dim_wealth     int,   -- 财运承载
 *   dim_action     int,   -- 行动能量
 *
 *   -- 报告核心结论
 *   top_dim        text,  -- 主维度键 (A/B/C/D/E)
 *   verdict_badge  text,  -- 核心判词标签
 *   verdict_title  text,  -- 判词标题
 *   formula        text,  -- 药芯配比
 *
 *   -- 转化埋点
 *   is_converted   boolean DEFAULT false
 * );
 * ─────────────────────────────────────────────────────
 */

const SUPABASE_URL      = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

/* 安全初始化：占位符未替换或 CDN 未加载时静默跳过 */
let db = null;
try {
  const configured =
    SUPABASE_URL      !== 'https://YOUR_PROJECT_ID.supabase.co' &&
    SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';

  if (typeof supabase !== 'undefined' && configured) {
    db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.info('[HerbLab] ✓ Supabase 已连接');
  } else {
    console.info('[HerbLab] Supabase 未配置，数据存储将静默跳过');
  }
} catch (e) {
  console.warn('[HerbLab] Supabase 初始化失败（不影响用户体验）:', e.message);
}
