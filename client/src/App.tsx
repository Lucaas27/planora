import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { DashboardPage } from "@/features/dashboard";
import { ActivitiesPage } from "@/features/activities";
import { MetadataProvider } from "@/providers/metadata-provider";

function App() {
  return (
    <BrowserRouter>
      <MetadataProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
          </Routes>
        </Layout>
      </MetadataProvider>
    </BrowserRouter>
  );
}

export default App;
