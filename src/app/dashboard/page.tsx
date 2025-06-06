import MainLayout from "@/components/layouts/Layout";
import SearchBar from "@/components/ui/SearchBar";
import Typography from "@/components/ui/Typography";

function Dashboard() {
  return (
    <MainLayout withNavbar={true} withFooter={false} classname="min-h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-5 mt-10">
        <Typography variant="h1" weight="bold">
          QuiHub
        </Typography>
        <SearchBar />
      </div>
    </MainLayout>
  );
}

export default Dashboard;
