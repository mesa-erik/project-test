import type { Contact } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";

// Define the type for the data that will be passed to the client
type LoaderData = { contacts: Contact[] };

export async function loader({ request }: LoaderArgs) {
  // Write a query that retrieves all contacts from the contacts table
  const result: Contact[] = await prisma.$queryRaw`SELECT id,
                                                   first_name AS "firstName", 
                                                   last_name AS "lastName", 
                                                   age, 
                                                   company, 
                                                   department
                                                   FROM contacts`;
  console.log(result);

  // Process the data so that only contacts who have engineering in their department name
  // are sent to the client
  const filteredContacts = result.filter((contact) =>
    contact.department.includes("Engineering")
  );

  // Send the filtered list to the client
  const data: LoaderData = {
    contacts: filteredContacts,
  };
  return json(data);
}

export default function ContactsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Contacts</Link>
        </h1>
        <Link
          to="/"
          className="flex items-center justify-center rounded-md border border-transparent bg-slate-100 px-4 py-3 text-base font-medium text-[#0f2d52] shadow-sm hover:bg-yellow-50 sm:px-8"
        >
          Home Page
        </Link>
      </header>

      <main className="flex h-full flex-row bg-white">
        <div className="w-full flex-1 overflow-auto">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Contact
          </Link>

          <hr />
          <div className="m-5 rounded-xl bg-slate-200 p-5">
            <table className="w-full">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Company</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {data.contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className={
                      contact.id % 2 == 0 ? "bg-slate-100" : "bg-white"
                    }
                  >
                    <td className="border-r-2 border-slate-200 p-2 text-center">
                      {contact.firstName}
                    </td>
                    <td className="border-r-2 border-slate-200 p-2 text-center">
                      {contact.lastName}
                    </td>
                    <td className="border-r-2 border-slate-200 p-2 text-center">
                      {contact.age}
                    </td>
                    <td className="border-r-2 border-slate-200 p-2 text-center">
                      {contact.company}
                    </td>
                    <td className="p-2">{contact.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
