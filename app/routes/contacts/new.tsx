import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { prisma } from "~/db.server";

export async function action({ request }: ActionArgs) {
  // Get the data from the form
  const formData = await request.formData();
  const firstName = formData.get("firstName")!.toString();
  const lastName = formData.get("lastName")!.toString();
  const age = parseInt(formData.get("age")!.toString());
  const company = formData.get("company")!.toString();
  const department = formData.get("department")!.toString();

  // Insert the form data into the contacts table
  await prisma.$queryRaw`INSERT INTO contacts
                         (first_name, last_name, age, company, department)
                         VALUES(${firstName}, ${lastName}, ${age}, ${company}, ${department})`;

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
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>First Name: </span>
            <input
              type="text"
              name="firstName"
              required
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Last Name: </span>
            <input
              type="text"
              name="lastName"
              required
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Age: </span>
            <input
              type="number"
              name="age"
              required
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Company: </span>
            <select
              name="company"
              required
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            >
              <option value={"Microsoft"}>Microsoft</option>
              <option value={"Google"}>Google</option>
              <option value={"Apple"}>Apple</option>
            </select>
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Department: </span>
            <select
              name="department"
              required
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            >
              <option value={"Software Engineering"}>
                Software Engineering
              </option>
              <option value={"Hardware Engineering"}>
                Hardware Engineering
              </option>
              <option value={"Sales"}>Sales</option>
              <option value={"Marketing"}>Marketing</option>
            </select>
          </label>
        </div>

        <div className="flex flex-row justify-between">
          <Link
            to={"/contacts"}
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Close
          </Link>
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
