import { Panel, Placeholder, Stack } from "rsuite";
import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "../config/supabase-client";

function WelcomePage() {
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    async function getReleases() {
      setLoading(true);

      let { data, error } = await supabase
        .from("releases")
        .select("*")
        // .order('created_at', { ascending: true })
        .order("created_at", { ascending: true });

      if (error) {
        console.warn(error);
      } else if (data) {
        setReleases(data);
      }
      setLoading(false);
    }

    getReleases();
  }, []);

  return (
    <Stack
      direction="column"
      spacing={20}
      style={{ marginTop: 30, padding: "0 30px" }}
    >
      <div style={{ padding: "auto", backgroundColor: "#000" }}>
        <img
          src="https://nrpcmqkzpwyhpqnxkftn.supabase.co/storage/v1/object/public/mics/Title.png"
          width="50%"
          style={{
            margin: "auto",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </div>
      <SifiCard title={"Getting Started"}>
        <p>
          First, welcome miner! I know your itching to get started mining,
          simulating fantastical worlds and mining them for collectible
          resources. META MINERS is a idle mining platform. Feel free to go
          about your business while your set up simulators produce resources
          every 20-30 minutes. as you colect items/resources you can choose to
          sell them for eC {"("} eatherCoin {")"}. eC be used to buy resources
          from other MINERS as well as purchase more simulation types for a
          chance of higher rarity drops. The choice is yours!
          <hr />
          <ol>
            <li>Create a new simulation</li>
            <p>by default a free account is allowed 3 simulations</p>
            <li>Then your simulator will start working for you</li>
            <p>some worlds take longer to output resources than others</p>
            <li></li>
          </ol>
        </p>
      </SifiCard>
      {releases.map((note) => (
        <ReleaseNotes header={note["header"]} content={note["content"]} />
      ))}
    </Stack>
  );
}

export default WelcomePage;
