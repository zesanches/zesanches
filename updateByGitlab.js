const axios = require('axios');
const fs = require('fs');

// Substitua com seu token de acesso privado do GitLab e IDs dos projetos
const gitlabToken = 'jvyyeGwz8ao9-Eq9w4yR';
const projectIds = ['400'];

const fetchCommits = async (projectId) => {
    const response = await axios.get(`https://gitlab.com/api/v4/projects/${projectId}/repository/commits`, {
        headers: {
            'PRIVATE-TOKEN': gitlabToken
        }
    });
    return response.data;
};

const updateReadme = async () => {
    let content = '# GitLab Activities\n\n';

    for (const projectId of projectIds) {
        const commits = await fetchCommits(projectId);
        content += `## Project ${projectId}\n`;
        commits.slice(0, 5).forEach(commit => {
            content += `- ${commit.title} (${commit.created_at})\n`;
        });
        content += '\n';
    }

    fs.writeFileSync('README.md', content, 'utf8');
};

updateReadme();
