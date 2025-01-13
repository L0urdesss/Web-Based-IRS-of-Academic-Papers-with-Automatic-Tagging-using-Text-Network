import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PaperForm from "./Partials/PaperForm";

export default function Add({ auth, paper = null }) {
  console.log("paper log: ", paper);
  return (
    <AuthenticatedLayout user={auth.user}>
      <head title={"Add Paper"} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <PaperForm
              auth={auth}
              paper={paper}
              className="max-w-xl"
            ></PaperForm>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
