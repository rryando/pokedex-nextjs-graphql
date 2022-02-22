import React from "react";
import styles from "./ScrollableTray.module.css";
import { debounce } from "../../utils/debounce";

export type Props = {
  aboutSectionTitle: string;
  statusSectionTitle?: string;
  evolutionSectionTitle?: string;
  aboutSection: React.ReactNode;
  statusSection?: React.ReactNode;
  evolutionSection?: React.ReactNode;
  onActiveSectionChange?: (sectionId: string) => null;
};

export default function ScrollableTray(props: Props) {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const statsRef = React.useRef<HTMLDivElement>(null);
  const evoRef = React.useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = React.useState("about");

  const scrollTo = (ref: any) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScroll = debounce(() => {
    const sectionsRefs = [aboutRef, statsRef, evoRef];
    sectionsRefs.forEach((refs) => {
      const currentTopPos = refs.current?.getBoundingClientRect().top || 0;

      if (currentTopPos! > 0 && currentTopPos! < window.innerHeight) {
        setActiveSection(refs.current?.id || "about");
        props.onActiveSectionChange &&
          props.onActiveSectionChange(refs.current?.id || "about");
      }
    });
  }, 100);

  return (
    <div className={styles.scrollableTray}>
      <div className={styles.scrollableTrayHeader}>
        <div
          className={`${styles.scrollableTrayHeaderItem} ${
            activeSection === "about" && styles.itemActive
          }`}
          onClick={() => {
            scrollTo(aboutRef);
            setActiveSection("about");
          }}
        >
          <h4>{props.aboutSectionTitle || "About"}</h4>
        </div>

        {props.statusSection && (
          <div
            className={`${styles.scrollableTrayHeaderItem} ${
              activeSection === "stats" && styles.itemActive
            }`}
            onClick={() => {
              scrollTo(statsRef);
              setActiveSection("stats");
            }}
          >
            <h4>{props.statusSectionTitle || "Status"}</h4>
          </div>
        )}

        {props.evolutionSection && (
          <div
            className={`${styles.scrollableTrayHeaderItem} ${
              activeSection === "evo" && styles.itemActive
            }`}
            onClick={() => {
              scrollTo(evoRef);
              setActiveSection("evo");
            }}
          >
            <h4>{props.evolutionSectionTitle || "Evolution"}</h4>
          </div>
        )}
      </div>
      <div
        className={styles.scrollableTrayContent}
        onScroll={() => handleScroll()}
      >
        <div ref={aboutRef} id={"about"}>
          {props.aboutSection}
        </div>
        {props.statusSection && (
          <div ref={statsRef} id={"stats"}>
            {props.statusSection}
          </div>
        )}

        {props.evolutionSection && (
          <div ref={evoRef} id={"evo"}>
            {props.evolutionSection}
          </div>
        )}
      </div>
    </div>
  );
}
