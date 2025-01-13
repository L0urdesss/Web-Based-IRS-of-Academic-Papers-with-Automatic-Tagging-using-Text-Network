import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PaperForm from "./Partials/PaperForm";
import backIcon from "@/Components/back.png";

export default function Edit({ auth, paper }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center px-4 md:px-6 lg:px-8">
          <Link
            replace
            href="/papers-admin"
            className="flex items-center ml-24"
          >
            <img src={backIcon} alt="Back" className="h-8 w-auto" />
          </Link>
          <h2 className="font-semibold text-xl text-gray-800 leading-tight mr-20">
            Research Paper #{paper.id}
          </h2>
        </div>
      }
    >
      <Head title={`Paper #${paper.id}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="w-full">
              <PaperForm paper={paper} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
