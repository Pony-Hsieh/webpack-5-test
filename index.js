import './assets/styles/main.scss'; // 使用 ESM 方式引入

import { getQueryString } from './assets/scripts/utility';
import { printA } from './assets/scripts/printA';
import { printB } from './assets/scripts/printB';

const arr = ['Roya', 'Owen', 'Eric'];

const index = arr.findIndex((item) => item === 'Owen');

console.log(`Owen 排在第 ${index + 1} 順位`);

if (getQueryString('inviteCode')) {
  console.log('網址列中有邀請碼');
}

printA();
// printB();

// 單行註解
/** 多行註解
 */

