import React, { useRef } from "react";
import gsap from "gsap";
import { Transition, TransitionGroup } from "react-transition-group";

const CollapseWrapper = ({ isVisible, children }) => {
  const nodeRef = useRef(null);
  

  return (
    <TransitionGroup>
      {isVisible && (
        <Transition
          key={isVisible ? "visible" : "hidden"}
          timeout={400}
          nodeRef={nodeRef}
          onEnter={() => {
            // debugger
            gsap.set(nodeRef.current, { height: 0, opacity: 0 , overflow: 'hidden' });
            gsap
              .timeline({ paused: true })
              .to(nodeRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
              })
              .play();
          }}
          onExit={() => {
            gsap
              .timeline({ paused: true })
              .to(nodeRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out",
                // onComplete: () => {
                //   // Reset overflow after animation to allow expansion if needed later
                //   gsap.set(nodeRef.current, { overflow: 'hidden' });
                // }
              })
              .play();
          }}
        >
          <div ref={nodeRef} className="overflow-hidden">{children}</div>
        </Transition>
      )}
    </TransitionGroup>
  );
};

export default CollapseWrapper;
