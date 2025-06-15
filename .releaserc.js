export default {
    branches: ["main"],
    tagFormat: "backend-v${version}",
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                preset: "conventionalcommits",
                parserOpts: {
                    noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"]
                }
            }
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                preset: "conventionalcommits",
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

