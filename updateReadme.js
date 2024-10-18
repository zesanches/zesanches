const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Configurações
const GITHUB_TOKEN = "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"; // Insira seu Personal Access Token aqui
const GITHUB_USERNAME = "zesanches"; // Insira seu nome de usuário do GitHub
const ORGANIZATION_NAME = "Tesserato-Software"; // Insira o nome da sua organização
const README_PATH = path.join(__dirname, "README.md"); // Caminho para o README

// Função para buscar contribuições
async function fetchContributions() {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/events`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    // Filtra as contribuições relevantes
    const contributions = response.data
      .filter((event) => event.type === "PushEvent")
      .map((event) => ({
        repo: event.repo.name,
        message: event.payload.commits
          .map((commit) => commit.message)
          .join(", "),
        date: new Date(event.created_at).toLocaleDateString(),
      }));

    return contributions;
  } catch (error) {
    console.error("Erro ao buscar contribuições:", error);
  }
}

// Função para atualizar o README
async function updateReadme() {
  const contributions = await fetchContributions();

  if (contributions.length === 0) {
    console.log("Nenhuma contribuição encontrada.");
    return;
  }

  const contributionText = contributions
    .map((contribution) => {
      return `- **${contribution.repo}**: ${contribution.message} (${contribution.date})`;
    })
    .join("\n");

  const readmeContent = `# Minhas Contribuições no GitHub\n\n${contributionText}\n`;

  fs.writeFileSync(README_PATH, readmeContent, "utf8");
  console.log("README.md atualizado com sucesso!");
}

// Executa a atualização do README
updateReadme();
