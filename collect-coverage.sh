#!/bin/bash
# Script to collect code coverage data using dotnet-coverage

set -e # Exit immediately if a command exits with a non-zero status

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Installing dotnet-coverage tool if not already installed...${NC}"
dotnet tool install --global dotnet-coverage || dotnet tool update --global dotnet-coverage

echo -e "${GREEN}Building the solution in Release mode...${NC}"
dotnet build --configuration Release

echo -e "${GREEN}Running tests with coverage collection...${NC}"
dotnet-coverage collect --output-format cobertura --output "./coverage/coverage.cobertura.xml" "dotnet test --configuration Release --no-build"

# Check if ReportGenerator is installed
if ! dotnet tool list -g | grep -q "dotnet-reportgenerator-globaltool"; then
    echo -e "${YELLOW}Installing ReportGenerator tool...${NC}"
    dotnet tool install -g dotnet-reportgenerator-globaltool
else
    echo -e "${GREEN}ReportGenerator already installed.${NC}"
fi

echo -e "${GREEN}Generating coverage report...${NC}"
reportgenerator \
    -reports:"./coverage/coverage.cobertura.xml" \
    -targetdir:"./coverage/report" \
    -reporttypes:"Html;HtmlSummary;Cobertura;MarkdownSummary;JsonSummary"

echo -e "${GREEN}Coverage report generated successfully!${NC}"
echo -e "${YELLOW}Summary:${NC}"
cat "./coverage/report/Summary.md"
echo ""
echo -e "${GREEN}HTML report is available at: ${YELLOW}./coverage/report/index.html${NC}"
echo -e "${GREEN}You can open this file in a browser to view detailed coverage information.${NC}"
