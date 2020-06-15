const videoControl = (function () {
  let data;
  let vid;
  let sections = [];
  let videoId;

  /**
   *  Setup all functions and makes them executable
   * @param {Object} jsonData
   * @param {String} videoId
   * @param {String} sectionsClassName
   * @example Setup(data, "v0", "section");
   */
  const Setup = (jsonData, videoId = "v0", sectionsClassName = "section") => {
    data = jsonData;
    vid = document.getElementById(videoId);
    sections = document.getElementsByClassName(sectionsClassName);

    selectRandomVideo();
    createVideoHandlers();
  };

  /**
   *  Select a random video that start first video
   */
  const selectRandomVideo = () => {
    let randomVid = data.videos[Math.floor(Math.random() * data.videos.length)];

    videoId = randomVid.id;
    let videoName = randomVid.filename;
    vid.src = `/Client/Video/${videoName}`;
  };

  /**
   *  Creates actions based on the events of the video player
   */
  const createVideoHandlers = () => {
    vid.onended = function () {
      for (var i = 0; i < sections.length; i++) {
        sections[i].style.visibility = "visible";

        let optionText = data.videos[videoId].options[i].text;
        let option = document.getElementsByClassName("section")[i];
        option.innerHTML = optionText;

        option.dataset.dest = data.videos[videoId].options[i].linkFilename;
        sections[i].addEventListener("click", (event) => {
          vid.src = `/Client/Video/${option.dataset.dest}`;
          console.log(option.dataset.dest);
        });
      }
    };
    vid.onplay = function () {
      for (var i = 0; i < sections.length; i++) {
        sections[i].style.visibility = "hidden";
      }

      data.videos.forEach((element) => {
        let query = vid.src.slice(vid.src.indexOf("/", 8) + 1);
        if (element.filename == query) {
          videoId = element.id;
        }
      });
    };
  };

  return {
    Setup: Setup,
  };
})();
