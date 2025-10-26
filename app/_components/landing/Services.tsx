import {
  Blocks,
  CloudCheck,
  FilePenLine,
  FileStack,
  FolderClock,
  FolderLock,
  MonitorCloud,
  MonitorSmartphone,
  Notebook,
  TypeOutline,
  Users,
  Watch,
} from "lucide-react";
import React from "react";

const Services = () => {
  return (
    <section id="testimonies" className="py-10 ">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 text-center">
            <div className="inline-block px-3 py-1 text-sm font-semibold bg-accent text-white rounded-lg md:text-center bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
              Your GoTo Notes App
            </div>
            <h1 className="mb-5 text-3xl font-bold md:text-center md:text-5xl">
              Services we Offer
            </h1>
            <p className="text-xl md:text-center md:text-2xl">
              Here's what others have to say about us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <ul className="space-y-8">
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-linear-to-r from-accent/30 to-accent/30 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <CloudCheck size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">Cloud-Based</h3>
                      <p className=" text-md">
                        Organize your thoughts effortlessly
                      </p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Store, edit, and organize your notes securely in the cloud,
                    accessible from any device. Togetha's cloud workspace
                    ensures your ideas are always safe, backed up, and available
                    wherever you are, making it the ultimate note-taking app for
                    individuals and teams.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <Watch size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        Real-Time Collaboration
                      </h3>
                      <p className=" text-md">Work together without limits</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Invite teammates to work on notes, projects, or tasks in
                    real-time. With live editing, commenting, and instant
                    updates, Togetha makes team collaboration seamless, boosting
                    productivity and ensuring everyone stays aligned on
                    projects.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <FolderClock size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        Version History Tracking
                      </h3>
                      <p className=" text-md">Never lose your progress</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Keep track of all your edits with detailed version history.
                    Togetha allows you to restore previous versions of notes or
                    projects, giving peace of mind for both personal
                    productivity and team workflows, and making it easy to
                    manage changes efficiently.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <FileStack size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        Unlimited Updates
                      </h3>
                      <p className=" text-md">Keep everything fresh</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Update your notes, tasks, and projects as often as needed
                    without limits. With Togetha, your cloud workspace is always
                    current, supporting continuous idea refinement, real-time
                    editing, and smooth team collaboration.
                  </p>
                </div>
              </div>
            </li>
          </ul>

          <ul className="hidden space-y-8 sm:block">
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <MonitorCloud size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        Customizable Workspaces
                      </h3>
                      <p className=" text-md">Tailor your environment</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Organize your workspace to fit your workflow. Use folders,
                    categories, and color-coded tags to structure notes, tasks,
                    and projects in a way that improves productivity and keeps
                    your ideas clear and easy to access.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <TypeOutline size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        Rich Text Editing
                      </h3>
                      <p className=" text-md">Write and format with ease</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Format your notes with headings, lists, bold, italics, and
                    links. Togetha's rich text editor makes it easy to create
                    structured, professional-looking content, perfect for
                    note-taking, project planning, or collaborative documents.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <MonitorSmartphone size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        Multi-Device Access
                      </h3>
                      <p className=" text-md">Your work, anywhere</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Access your workspace from desktop, tablet, or mobile
                    device. Togetha's cross-platform accessibility ensures your
                    notes and projects are always within reach, improving
                    productivity whether you're in the office, at home, or on
                    the go.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <FilePenLine size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">Offline Mode</h3>
                      <p className=" text-md">Work without interruptions</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Edit, review, and organize notes even when you're offline.
                    Togetha automatically syncs your changes when you reconnect
                    to the internet, ensuring uninterrupted productivity and
                    reliable note management anywhere.
                  </p>
                </div>
              </div>
            </li>
          </ul>

          <ul className="hidden space-y-8 lg:block">
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <Blocks size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        API Integrations
                      </h3>
                      <p className=" text-md">
                        Connect with your favorite tools
                      </p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Integrate Togetha with popular productivity and project
                    management apps. Our API support allows automated workflows,
                    syncing notes, tasks, and projects across multiple
                    platforms, boosting efficiency for teams and individuals
                    alike.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <FolderLock size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        Secure Data Encryption
                      </h3>
                      <p className=" text-md">Protect your information</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    All notes, tasks, and projects are protected with advanced
                    encryption. Togetha ensures your cloud workspace is secure,
                    private, and compliant, making it ideal for sensitive
                    information and collaborative team projects.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <Notebook size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        Custom Domain Support
                      </h3>
                      <p className=" text-md">Your workspace, your brand</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Host your workspace on a personalized domain to match your
                    team or company branding. Togetha's custom domain feature
                    provides a professional appearance while supporting team
                    collaboration and shared productivity workflows.
                  </p>
                </div>
              </div>
            </li>
            <li className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1  bg-linear-to-r from-accent/30 to-accent/30  blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-background">
                  <div className="flex items-center space-x-4">
                    <Users size={35} className="text-accent" />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        Team Roles & Permissions
                      </h3>
                      <p className=" text-md">Control access effectively</p>
                    </div>
                  </div>
                  <p className="leading-normal text-primary/80 text-md">
                    Assign roles and permissions to manage who can view or edit
                    specific notes and projects. Togetha provides flexible
                    access control to support team collaboration while
                    maintaining security and organization.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
