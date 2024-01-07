export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2
    },
    750: {
      slidesPerView: 3
    },
    1100: {
      slidesPerView: 4,
    },
  },

};


export const updateFavourites = (id, favResidenciesID) => {
  if (favResidenciesID.includes(id)) {
    return favResidenciesID.filter((resID) => resID != id)
  } else {
    return [...favResidenciesID, id]
  }
}

// framer motion 

export const basic = (y = 0, duration = 0.8, delay = 0) => ({
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, duration, delay }
  },
  hidden: {
    y,
    opacity: 0
  }
});

export const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1 // mỗi child sẽ xuất hiện cách nhau 0.1 giây
    }
  },
  hidden: {
    opacity: 0
  }
};

export const squareVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, duration: 0.8 } }
};
