export default {
    branches: ["main"],
    tagFormat: "frontend-v${version}",
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                preset: "angular",
                parserOpts: {
                    noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"]
                },
                releaseRules: [
                    {type: "feat", scope: "frontend", release: "minor"},
                    {type: "fix", scope: "frontend", release: "patch"}
                ]
            }
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                preset: "angular",
                writerOpts: {
                    transform: (commit, context) => {
                        if (commit.scope !== 'frontend') {
                            return false;
                        }
                        return commit;
                    }
                }
            }
        ],
        "@semantic-release/github"
    ]
};
