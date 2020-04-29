import { gsap } from "gsap";

// intersection observer
function intersector() {
	console.log("intersector");
	const config = { threshold: 0.5 };
	let observer = new IntersectionObserver(function (entries, self) {
		let targets = entries.map((entry) => {
			if (entry.isIntersecting) {
				self.unobserve(entry.target);
				return entry.target;
			}
		});
		// Call animation function
		fadeIn(targets);
	}, config);
	document.querySelectorAll("blockquote").forEach((element) => {
		observer.observe(element);
	});
}

// // fades in the targets
function fadeIn(targets) {
	gsap.to(targets, {
		opacity: 1,
		stagger: 0.5,
	});
}

export { intersector };
