import { readdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url';

/**
 * 判断目录是否为空
 */
export function isDirEmpty(dir) {
  return readdir(dir).then(files => {
    return files.length === 0;
  });
}

/**
 * 当前(命令行文件)文件所在目录
 */
export const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 工作区根目录
 */
export const workspaceRoot = process.cwd()
