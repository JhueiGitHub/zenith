import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DesktopLayout, ZenithFlow } from "@/components/layout/desktop-layout";

// Type guard function
function isZenithFlow(flow: any): flow is ZenithFlow {
  return (
    flow &&
    typeof flow.tokens === "object" &&
    flow.tokens !== null &&
    typeof flow.tokens.colors === "object" &&
    flow.tokens.colors !== null &&
    typeof flow.tokens.colors.background === "object" &&
    flow.tokens.colors.background !== null &&
    typeof flow.tokens.colors.background.primary === "string"
  );
}

const DesktopPage = async () => {
  // Fetch the user's profile and Zenith flow
  const profile = await db.profile.findFirst({
    include: {
      streams: {
        include: {
          flows: true,
        },
      },
    },
  });

  if (!profile) {
    return redirect("/");
  }

  const zenithFlow = profile.streams
    .find((stream) => stream.name === "OS")
    ?.flows.find((flow) => flow.name === "Zenith");

  if (!zenithFlow || !isZenithFlow(zenithFlow)) {
    console.error("Zenith flow not found or invalid");
    return null;
  }

  return (
    <DesktopLayout zenithFlow={zenithFlow}>
      <div>
        {/* Desktop content */}
        <h1>Welcome to your desktop</h1>
      </div>
    </DesktopLayout>
  );
};

export default DesktopPage;
