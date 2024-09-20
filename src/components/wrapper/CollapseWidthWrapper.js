import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import {
  Transition,
  TransitionGroup,
  SwitchTransition,
} from "react-transition-group";

const CollapseWidthWrapper = ({ isVisible, children, keyProp }) => {
  const nodeRef = useRef(null);

  // const [currentKey, setCurrentKey] = useState(keyProp);
  // const [isAnimating, setIsAnimating] = useState(false);

  // useEffect(() => {
  //   if (keyProp !== currentKey && !isAnimating) {
  //     // Trigger the exit animation first
  //     setIsAnimating(true);
  //   }
  // }, [keyProp, currentKey, isAnimating]);

  return (
    // <TransitionGroup>
    //   {isVisible && (
    <SwitchTransition mode="out-in">
        <Transition
          key={isVisible ? keyProp : "hidden"}
          timeout={400}
          nodeRef={nodeRef}
          unmountOnExit
          mountOnEnter
          onEnter={() => {
            gsap.set(nodeRef.current, {
              width: 0,
              opacity: 0,
              overflow: "hidden",
            });
            gsap
              .timeline({ paused: true })
              .to(nodeRef.current, {
                width: "auto",
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                // onComplete: () => {
                //   gsap.set(nodeRef.current, { width: "auto", overflow: "visible" });
                //   setIsAnimating(false); // Animation is complete
                // }
              })
              .play();
          }}
          onExit={() => {
            gsap
              .timeline({ paused: true })
              .to(nodeRef.current, {
                width: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out",
                // onComplete: () => {
                //   // After the element exits, update the key to the new one
                //   setCurrentKey(keyProp);
                // }
                // onComplete: () => {
                //   // Reset overflow after animation to allow expansion if needed later
                //   gsap.set(nodeRef.current, { overflow: 'hidden' });
                // }
              })
              .play();
          }}
          // onExited={() => {
          //   // Trigger re-entry of the new element after the exit animation is done
          //   setIsAnimating(false);
          // }}
        >
          <div ref={nodeRef} className="overflow-hidden">
            {isVisible ? children : null}
          </div>
        </Transition>
    </SwitchTransition>
  );
};

export default CollapseWidthWrapper;
