# CLAUDE.md

本项目遵循 Git Flow 分支策略，单人开发模式。

## 分支模型

| 分支        | 用途             | 直接提交 | 合并来源                  |
| ----------- | ---------------- | -------- | ------------------------- |
| `main`      | 生产就绪         | 禁止     | `develop` / `hotfix/*`    |
| `develop`   | 开发集成分支     | 禁止     | `feature/*` / `release/*` |
| `feature/*` | 功能开发（短期） | 允许     | —                         |

## 分支命名规范

| 类型 | 命名格式         | 从哪拉  | 合并到哪       | 示例                 |
| ---- | ---------------- | ------- | -------------- | -------------------- |
| 功能 | `feature/<描述>` | develop | develop        | `feature/user-auth`  |
| 发布 | `release/<版本>` | develop | main + develop | `release/1.0.0`      |
| 热修 | `hotfix/<描述>`  | main    | main + develop | `hotfix/login-crash` |

## 标准工作流

```
# 从 develop 拉 feature 分支
git checkout develop && git pull origin develop
git checkout -b feature/xxx

# 开发完成后合并回 develop
git checkout develop
git merge feature/xxx
git push origin develop

# develop 稳定后合并到 main
git checkout main
git merge develop
git push origin main

# 清理已合并的 feature 分支
git branch -d feature/xxx
git push origin --delete feature/xxx
```

## 操作规范

- **禁止**在 `main` / `develop` 上直接提交，只能通过 merge 进入
- feature 分支是短期的，合并后立即删除
- 提交前用 `git branch` 确认当前分支，避免错投
- `develop` 和 `main` 始终保持可运行，不提交半成品