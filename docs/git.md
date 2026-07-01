## 初步理解 git

git 将项目进行抽象为四个部分：本地代码、暂存区、本地仓库、远端仓库。

在本地代码中进行开发，开发完成后使用 git add 推送到暂存区，使用 git commit 将暂存区的内容推送到本地仓库，使用 git push 将本地仓库中的内容推送到远端仓库。

在本地仓库开发时，会使用 git checkout 创建或切换分支，使用 git rebase 进行同步分支代码，使用 git pull 从远端仓库中同步到本地仓库。

远端仓库中使用 merge request 进行合并远端功能分支。

merge 和 rebase 可以做的功能类似，但本质仍是服务不同的情况，merge 用于共享时合并，保证安全；rebase 用于本地合并，保证简洁。

## git 协同流程

在开发过程中，会有多个 git 分支，不同的分支有着其对应的作用。

main 分支：线上分支，表示具有的稳定功能的可上线的分支。

hotfix-a 分支：线上修复分支，从线上分支拉取的用于紧急修复的分支。

develop 分支：研发分支，开发功能的主分支，总是包含最新的功能。

feature-a 分支：功能分支，从 develop 分支拉取的，用于开发新功能的分支，最终合并到 develop 分支中。

feature -> develop ：开发完成，测试通过，功能确定上线时合并。

develop -> main ：已经发布上线，线上验收完成。

hotfix-a -> main ：已经发布上线，线上验收完成。

## git 提交规范

- feat：新功能
- fix：修补 bug
- docs：文档
- style：格式
- refactor：重构
- test：增加测试
- chore：构建过程或辅助工具的变动

## 常用命令

git branch 查看本地拥有的分支和现在所处的分支。

git status 查看所处的分支。

git checkout -b branch-name 创建并切换到 branch-name 分支。

