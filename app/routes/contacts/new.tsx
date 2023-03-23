import type { ActionArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { prisma } from "~/db.server";

export async function action({ request }: ActionArgs) {
  // Get the data from the form here
  const formData = await request.formData();

  // Insert the form data into the contacts table
  await prisma.$queryRaw``;

  // Navigate back to the contacts page
  return redirect(`..`);
}

export default function NewContactPage() {
  return (
    <div className="scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-500 m-5 mr-6 h-[80vh] overflow-y-auto rounded-xl bg-slate-200 p-5 shadow-lg">
      {/*Create your new contacts form here*/}
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        {/*A styled input field for reference <div>
          <label className="flex w-full flex-col gap-1">
            <span>First Name: </span>
            <input
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
        </div> */}

        <div className="flex flex-row justify-between">
          <Link
            to={"/contacts"}
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Close
          </Link>
        </div>
      </Form>
    </div>
  );
}
