export const idleParticlesConfig = {
  particles: {
    number: {
      value: 15,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#8B5CF6", "#7C3AED", "#6D28D9", "#4C1D95"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none" as const,
      random: true,
      straight: false,
      out_mode: "out" as const,
      bounce: false
    }
  },
  interactivity: {
    detectsOn: "window" as const,
    events: {
      onhover: {
        enable: false
      },
      onclick: {
        enable: false
      },
      resize: true
    }
  },
  retina_detect: true
};

export const spinningParticlesConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#8B5CF6", "#7C3AED", "#6D28D9", "#4C1D95", "#60A5FA", "#3B82F6"]
    },
    shape: {
      type: "star",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.8,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 4,
        size_min: 0.3,
        sync: false
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none" as const,
      random: true,
      straight: false,
      out_mode: "out" as const,
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detectsOn: "window" as const,
    events: {
      onhover: {
        enable: false
      },
      onclick: {
        enable: false
      },
      resize: true
    }
  },
  retina_detect: true
};
