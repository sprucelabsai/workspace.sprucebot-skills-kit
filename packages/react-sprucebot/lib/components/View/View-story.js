"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _StylesProvider = _interopRequireDefault(require("../../../.storybook/StylesProvider"));

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _user0196w = _interopRequireDefault(require("../../../static/assets/users/user-01--96w.png"));

var _View = _interopRequireDefault(require("./View.js"));

var HomeIcon = function HomeIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M3.502 9.297v5.5h4v-4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4h4v-5.5M1.502 8.297l6.793-6.793a1 1 0 0 1 1.414 0l6.793 6.793",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

HomeIcon.defaultProps = {
  width: "18",
  height: "16",
  viewBox: "0 0 18 16",
  xmlns: "http://www.w3.org/2000/svg"
};

var TeamsIcon = function TeamsIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M4.133 6.854a4.567 4.567 0 0 0 5.095 1.024",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M6.5 11a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M9 16.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M10.991 16.232a4.5 4.5 0 0 0-7.924-2.643",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M12.75 11.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M15.183 13.246a3 3 0 0 0-5.146.472",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

TeamsIcon.defaultProps = {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  xmlns: "http://www.w3.org/2000/svg"
};

var NotificationsIcon = function NotificationsIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M14.138 5.497a6.067 6.067 0 1 0-10.857 5.261L1.5 14.5l3.741-1.782c.69.43 1.457.716 2.259.842M5.5 5.5h5M5.5 8.5h2",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M12.921 8a3.563 3.563 0 0 1 2.684 5.924l.448 2.576-2.334-1.439A3.576 3.576 0 1 1 12.92 8h.002z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M14 10.5h-2M14 12.5h-2",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

NotificationsIcon.defaultProps = {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  xmlns: "http://www.w3.org/2000/svg"
};

var ProvideStyles = function ProvideStyles(storyFn) {
  return _react.default.createElement(_StylesProvider.default, null, storyFn());
};

var stories = (0, _react2.storiesOf)('View', module);
stories.addDecorator(ProvideStyles);
stories.addDecorator(_react3.withKnobs);
var personalItems = [{
  text: 'Home',
  icon: _react.default.createElement(HomeIcon, {
    className: "sidebar-item__line-icon"
  }),
  isCurrent: true,
  href: '#'
}, {
  text: 'Teams',
  icon: _react.default.createElement(TeamsIcon, {
    className: "sidebar-item__line-icon"
  }),
  isCurrent: false,
  href: '#'
}, {
  text: 'Notification Preferences',
  icon: _react.default.createElement(NotificationsIcon, {
    className: "sidebar-item__line-icon"
  }),
  isCurrent: false,
  href: '#'
}];
var user = {
  name: 'Madaline Gibson',
  image: _user0196w.default,
  tel: '(605) 230-5253'
};
var business = {
  name: 'Chimera Hair Salon',
  address: '7678 N High St, Denver, CO'
};
stories.add('Default', function () {
  return _react.default.createElement(_View.default, {
    STORYBOOKdoNotWrap: true,
    sidebarItems: personalItems,
    user: user,
    business: business
  }, _react.default.createElement("header", {
    className: "l-pa-medium"
  }, _react.default.createElement("h1", null, "Hello Human")), _react.default.createElement(_Container.default, {
    className: "l-ph-medium"
  }, _react.default.createElement("h2", {
    class: "l-mb-small"
  }, "If you could time travel, what would you do?"), _react.default.createElement("p", {
    class: "l-mb-small"
  }, "Swimming hundreds of feet beneath the ocean\u2019s surface in many parts of the world are prolific architects called giant larvaceans. These zooplankton are not particularly giant themselves (they resemble tadpoles and are about the size of a pinkie finger), but every day, they construct one or more spacious houses\u201D that can exceed three feet in length. The houses are transparent mucus structures that encase the creatures inside. Giant larvaceans beat their tails to pump seawater through these structures, which filter tiny bits of dead or drifting organic matter for the animals to eat. When their filters get clogged, the larvaceans abandon ship and construct a new house. Laden with debris from the water column, old houses rapidly sink to the seafloor. In a study published in Science Advances on Wednesday, scientists near California\u2019s Monterey Bay have found that, through this process, giant larvaceans can filter all of the bay\u2019s water from about 300 to 1,000 feet deep in less than two weeks, making them the fastest known zooplankton filter feeders. In doing so, the creatures help transfer carbon that has been removed from the atmosphere by photosynthesizing organisms to the deep sea, where it can be buried and stored long term. And given their abundance in other parts of the world, these organisms likely play a crucial role in the global carbon cycle. When it comes to the flow of carbon in the ocean, we don\u2019t know nearly as much as we should,\u201D said Kakani Katija, a principal engineer at the Monterey Bay Aquarium Research Institute and the study\u2019s lead author. If we really want to understand how the system works, we have to look at all the players involved. Giant larvaceans are one important group we need to learn more about.\u201D In the past, other scientists have tried studying giant larvaceans in the laboratory. But these efforts always failed because the animals\u2019 houses were too fragile to be harvested and collected specimens were never able to build houses outside the ocean.To study the zooplankton in their natural habitat, Dr. Katija and her collaborators developed a new deep-sea imaging instrument, called DeepPIV, which they paired with a remotely operated vehicle. DeepPIV projects a sheet of laser light that cuts straight through a larvacean\u2019s mucus house. A high-definition camera on the remotely operated vehicle can then capture the inner pumping mechanisms illuminated by the laser."), _react.default.createElement("h2", {
    class: "l-mb-small"
  }, "Blazeon Scrambles to Police Content Amid Rapid Growth"), _react.default.createElement("h3", {
    class: "l-mb-small"
  }, "Do you like roller coasters?"), _react.default.createElement("p", {
    class: "l-mb-small"
  }, "The recording starts with the patter of a summer squall. Later, a drifting tone like that of a not-quite-tuned-in radio station rises and for a while drowns out the patter. These are the sounds encountered by NASA\u2019s Cassini spacecraft as it dove through the gap between Saturn and its innermost ring on April 26, the first of 22 such encounters before it will plunge into Saturn\u2019s atmosphere in September. What Cassini did not detect were many of the collisions of dust particles hitting the spacecraft as it passed through the plane of the rings. You can hear a couple of clicks,\u201D said William S. Kurth, a research scientist at the University of Iowa who is the principal investigator for Cassini\u2019s radio and plasma science instrument. The few dust hits that were recorded sounded like the small pops caused by dust on a LP record, he said. What he had expected was something more like the din of driving through Iowa in a hailstorm,\u201D Dr. Kurth said. Since Cassini had not passed through this region before, scientists and engineers did not know for certain what it would encounter. Cassini would be traveling at more than 70,000 miles per hour as it passed within 2,000 miles of the cloud tops, and a chance hit with a sand grain could be trouble. The analysis indicated that the chances of such a collision were slim, but still risky enough that mission managers did not send Cassini here until the mission\u2019s final months. As a better-safe-than-sorry precaution, the spacecraft was pointed with its big radio dish facing forward, like a shield. Not only was there nothing catastrophic, there was hardly anything at all. The few clicking sounds were generated by dust the size of cigarette smoke particles about a micron, or one-25,000th of an inch, in diameter. To be clear: Cassini did not actually hear any sounds. It is, after all, flying through space where there is no air and thus no vibrating air molecules to convey sound waves. But space is full of radio waves, recorded by Dr. Kurth\u2019s instrument, and those waves, just like the ones bouncing through the Earth\u2019s atmosphere to broadcast the songs of Bruno Mars, Beyonc\xE9 and Taylor Swift, can be converted into audible sounds. Dr. Kurth said the background patter was likely oscillations of charged particles in the upper part of Saturn\u2019s ionosphere where atoms are broken apart by solar and cosmic radiation. The louder tones were almost certainly whistler mode emissions\u201D when the charged particles oscillate in unison."), _react.default.createElement("h3", {
    class: "l-mb-small"
  }, "How many pairs of shoes do you own?"), _react.default.createElement("p", {
    class: "l-mb-small"
  }, "MIAMI \u2014 For decades, South Florida schoolchildren and adults fascinated by far-off galaxies, earthly ecosystems, the properties of light and sound and other wonders of science had only a quaint, antiquated museum here in which to explore their interests. Now, with the long-delayed opening of a vast new science museum downtown set for Monday, visitors will be able to stand underneath a suspended, 500,000-gallon aquarium tank and gaze at hammerhead and tiger sharks, mahi mahi, devil rays and other creatures through a 60,000-pound oculus, a lens that will give the impression of seeing the fish from the bottom of a huge cocktail glass. And that\u2019s just one of many attractions and exhibits. Officials at the $305 million Phillip and Patricia Frost Museum of Science promise that it will be a vivid expression of modern scientific inquiry and exposition. Its opening follows a series of setbacks and lawsuits and a scramble to finish the 250,000-square-foot structure. At one point, the project ran precariously short of money. The museum\u2019s high-profile opening is especially significant in a state imperiled by rising sea levels and overseen by a governor, Rick Scott, who has said he is unconvinced that climate change and global warming are real and whose administration is widely reported to have set an unwritten policy that state agencies refrain from using the terms. The problem is not that people don\u2019t believe in science, but that they pick and choose which science they want to believe,\u201D Frank Steslow, a microbiologist appointed a year ago as the museum\u2019s president, said on a recent morning while walking around the four-acre site. I don\u2019t know that we need to do anything other than be who we are and present the facts and be a resource for everybody.\u201D As workers swarmed over the site \u2014 near the P\xE9rez Art Museum Miami and the Adrienne Arsht Center for the Performing Arts \u2014 Mr. Steslow pointed to interactive exhibits about the fragile South Florida ecosystem, including one on the vast but shrinking Everglades wetlands, and the varied animal species, many of them endangered, that call the region home."), _react.default.createElement("h2", {
    class: "l-mb-small"
  }, "As Hulu Live Is Introduced, a Look at TV Streaming Services"), _react.default.createElement("p", null, "Mauna Loa, the biggest volcano on Earth \u2014 and one of the most active \u2014 covers half the Island of Hawaii. Just 35 miles to the northeast, Mauna Kea, known to native Hawaiians as Mauna a Wakea, rises nearly 14,000 feet above sea level. To them it represents a spiritual connection between our planet and the heavens above. These volcanoes, which have beguiled millions of tourists visiting the Hawaiian islands, have also plagued scientists with a long-running mystery: If they are so close together, how did they develop in two parallel tracks along the Hawaiian-Emperor chain formed over the same hot spot in the Pacific Ocean \u2014 and why are their chemical compositions so different? We knew this was related to something much deeper, but we couldn\u2019t see what,\u201D said Tim Jones, an earth science Ph.D. student at Australian National University and the lead author of a paper published in Nature on Wednesday that may hold the answer. Mr. Jones and his colleagues developed a model that simulates what\u2019s happening in our planet\u2019s mantle, beneath the crust that we live on, offering a window to the center of the Earth \u2014 or close to it. Their study may one day allow a reconstruction of the history of the movement of Earth\u2019s plates \u2014 and the processes linked to these movements over billions of years, like mass extinction events, diamond and oil deposits, and changes in climate. If you were to drill nearly 4,000 miles into the Earth, you\u2019d reach its core, a ball of solid iron surrounded by liquid that scientists estimate is hotter than the sun. Before making it there, you\u2019d hit the mantle \u2014 an 1,800-mile-thick layer of solid rock that can flow like a liquid, just substantially slower. This mantle is the reason plates move across the surface. It\u2019s why we have continents, earthquakes and volcanoes. The closest anyone ever got to the mantle was a seven-mile-deep hole drilled into the crust on a peninsula in western Russia. But now we can better understand what\u2019s happening below by looking at Mauna Kea and Mauna Loa, said Mr. Jones. The prevailing hypothesis has been that volcanoes like these two in Hawaii are chemical fingerprints of the Earth\u2019s composition at the deep mantle, just at the border of its core. Scientists have seismic evidence that the deep part of the mantle is a graveyard where long ago slabs of earth were subducted, or thrust underneath one another, creating separate regions with different chemical compositions that eventually made their way to the surface in a hot mantle plume, or upwelling, as the core heated the rock into magma.But that didn\u2019t explain the separate tracks along which the volcanoes formed. By examining data from the two volcanoes, Mr. Jones and his team suggested an alternative: The chemical signature, along with this double-track volcanism as it\u2019s called, occurred three million years ago when the plates above the hot spot shifted direction, moving north. This shimmy rearranged zones of magma that are heated under different pressures in the shallower part of the mantle \u2014 when they cool, the volcanic rock that results reflects this difference. Previously stacked on top of one another, the movement of the plates exposed now geographically separates magma zones that fed the volcanoes individually.")));
});