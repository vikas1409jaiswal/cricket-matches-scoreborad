import { motion } from "framer-motion";
import { AnimatedNumber } from "../../common/AnimatedNumber";
import { Colors } from "../../../colors";
import { config, Language } from "../../../configs";
import { PlayerImage } from "../elements/PlayerImage";
import teamLogos from "../../../data/StaticData/teamLogos.json";

interface Top5PlayerCardProps {
  href: string;
  name: string;
  stat: number;
  teamShortName: string;
  animate: any;
  custom: number;
  showPlayerOverlay: boolean;
  togglePlayerOverlay: any;
  selectedPlayerHref: string;
  setSelectedPlayerHref: any;
}

export const Top5PlayerCard: React.FC<Top5PlayerCardProps> = ({
  href,
  name,
  stat,
  teamShortName,
  animate,
  custom,
  showPlayerOverlay,
  togglePlayerOverlay,
  selectedPlayerHref,
  setSelectedPlayerHref,
}) => {
  return (
    <motion.div
      className="top-player-card"
      animate={animate}
      custom={custom}
      style={{
        background: `radial-gradient(${Colors.White}, ${
          teamLogos.find((tl) => tl.shortName === teamShortName)?.primaryColor
        }, ${Colors.Black})`,
      }}
      onDoubleClick={() => {
        togglePlayerOverlay(true);
        setSelectedPlayerHref(href);
      }}
    >
      <PlayerImage
        href={href}
        alt={href}
        height={330}
        width={200}
        teamName={
          config.language === Language.Hindi
            ? teamLogos.find((tl) => tl.shortName === teamShortName)
                ?.hindiTeamName
            : teamLogos.find((tl) => tl.shortName === teamShortName)?.teamName
        }
        ignoreLocale
      />
      <AnimatedNumber
        value={stat || 0}
        duration={3000}
        className="stat-number"
      />
      <p className="name-header">
        <a
          href={`https://www.espncricinfo.com/${href}`}
          style={{ color: "white", textDecoration: "none" }}
        >
          {name}
        </a>
      </p>
      <img
        className="team-logo"
        src={`http://localhost:3012/images-team-logos/${teamLogos
          .find((x) => x.shortName === teamShortName)
          ?.teamName?.replaceAll(" ", "-")}.png`}
        alt={href}
        height={120}
        width={100}
      />
    </motion.div>
  );
};
