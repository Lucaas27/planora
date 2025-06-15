module.exports = {
    branches: ["main"],
    tagFormat: "backend-v${version}",
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                preset: "angular",
                parserOpts: {
                    noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"]
                },
                releaseRules: [
                    {type: "feat", scope: "backend", release: "minor"},
                    {type: "fix", scope: "backend", release: "patch"}
                ]
            }
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                preset: "angular",
                writerOpts: {
                    transform: (commit, context) => {
                        if (commit.scope !== 'backend') {
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
