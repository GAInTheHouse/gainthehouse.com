// Dynamic Content Loading for Lightboxes
$(document).ready(function() {
	console.log('Document ready, starting to load dynamic content...');
	
	// Offset for Site Navigation
	$('#siteNav').affix({
		offset: {
			top: 100
		}
	});
	
	// Load dynamic content
	loadResearchProjects();
	loadSoftwareProjects();
	loadWorkExperience();
	loadOrganizations();
	loadHobbies();
});

// Load Research Projects
function loadResearchProjects() {
	$.getJSON('data/research.json', function(data) {
		console.log('Loading research projects:', data.projects.length, 'projects');
		// Remove existing slides
		$('#myModallightbox .modal-content-lightbox .mySlides').remove();
		
		data.projects.forEach((project, index) => {
			const slideNumber = index + 1;
			const totalSlides = data.projects.length;
			
			let slideHTML = `
				<div class="mySlides" style="background-color: coral; font-size: 18px; color: white;">
					<div class="numbertext">${slideNumber}/${totalSlides}</div>
					<br>
					<h1 style="font-family:'Charmonman',cursive;text-align: center" class="music-icon">
						${project.title}
					</h1>`;
			
			if (project.period) {
				slideHTML += `<h3 style="text-align: center">${project.period}</h3>`;
			}
			
			if (project.logo) {
				slideHTML += `
					<h1 style="text-align: center" class="cursor">
						<img src="${project.logo}" width="5%" height="5%" float="center">
					</h1>`;
			}
			
			slideHTML += `<br><br>`;
			
			// Add links/galleries if they exist
			if (project.links && project.links.length > 0) {
				project.links.forEach(link => {
					if (link.type === 'paper' || link.type === 'document') {
						slideHTML += `
							<a href="${link.url}" class="cursor">
								<div class="gallery">
									<img src="${link.image}">
									<div class="desc"><b>${link.text}</b></div>
								</div>
							</a>`;
					} else if (link.type === 'image') {
						if (link.url) {
							slideHTML += `
								<a href="${link.url}" class="cursor">
									<div class="gallery">
										<img src="${link.image}">
										<div class="desc"><b>${link.text}</b></div>
									</div>
								</a>`;
						} else {
							slideHTML += `
								<div class="gallery">
									<img src="${link.image}">
									<div class="desc"><b>${link.text}</b></div>
								</div>`;
						}
					} else if (link.type === 'video') {
						slideHTML += `
							<div class="gallery">
								<video controls>
									<source src="${link.url}" type="video/mp4">
									Your browser does not support the video tag.
								</video>
								<div class="desc"><b>${link.text}</b></div>
							</div>`;
					}
				});
				slideHTML += `<br><br><br><br><br><br><br><br><br><br><br>`;
			}
			
			// Add description
			slideHTML += `<ul>`;
			project.description.forEach(desc => {
				slideHTML += `&nbsp;&nbsp;<li>${desc}</li>`;
			});
			slideHTML += `</ul>`;
			
			// Add external links at the end
			if (project.links && project.links.length > 0) {
				const externalLinks = project.links.filter(l => l.type === 'external' || l.type === 'github' || l.type === 'devpost');
				if (externalLinks.length > 0) {
					externalLinks.forEach(link => {
						if (link.type === 'external') {
							slideHTML += `&nbsp;&nbsp;<li><a href="${link.url}" class="cursor">${link.text}</a></li>`;
						} else if (link.type === 'github') {
							slideHTML += `&nbsp;&nbsp;<li><a href="${link.url}" class="cursor">${link.text}</a></li>`;
						} else if (link.type === 'devpost') {
							slideHTML += `&nbsp;&nbsp;<li><a href="${link.url}" class="cursor">${link.text}</a></li>`;
						}
					});
				}
				
				// Check for video links with images (like youtube)
				const videoLinks = project.links.filter(l => l.type === 'video' && l.image);
				if (videoLinks.length > 0) {
					videoLinks.forEach(link => {
						slideHTML += `
							&nbsp;&nbsp;<li>
								<a href="${link.url}">
									<img src="${link.image}">
								</a>
								: ${link.text}
							</li>`;
					});
				}
			}
			
			slideHTML += `<br></div>`;
			
			// Insert before the prev button
			$('#myModallightbox .modal-content-lightbox .prev').before(slideHTML);
		});
		
		// Re-initialize the slideshow
		console.log('Research slides inserted, initializing slideshow');
		showSlides(1);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error('Error loading research projects:', textStatus, errorThrown);
	});
}

// Load Software Projects
function loadSoftwareProjects() {
	$.getJSON('data/projects.json', function(data) {
		console.log('Loading software projects:', data.projects.length, 'projects');
		$('#myModallightbox2 .modal-content-lightbox .mySlides2').remove();
		
		data.projects.forEach((project, index) => {
			const slideNumber = index + 1;
			const totalSlides = data.projects.length;
			
			let slideHTML = `
				<div class="mySlides2" style="background-color: coral; font-size: 18px; color: white;">
					<div class="numbertext">${slideNumber}/${totalSlides}</div>
					<br>
					<h1 style="text-align: center" class="cursor">
						${project.title}
					</h1>`;
			
			if (project.period) {
				slideHTML += `<h3 style="text-align: center">${project.period}</h3>`;
			}
			
			slideHTML += `<br>`;
			
			// Add links/galleries if they exist
			if (project.links && project.links.length > 0) {
				project.links.forEach(link => {
					if (link.type === 'document') {
						slideHTML += `
							<a href="${link.url}" class="cursor">
								<div class="gallery">
									<img src="${link.image}">
									<div class="desc"><b>${link.text}</b></div>
								</div>
							</a>`;
					} else if (link.type === 'image') {
						if (link.url) {
							slideHTML += `
								<a href="${link.url}" class="cursor">
									<div class="gallery">
										<img src="${link.image}">
										<div class="desc">${link.text}</div>
									</div>
								</a>`;
						} else {
							slideHTML += `
								<div class="gallery">
									<img src="${link.image}">
									<div class="desc"><b>${link.text}</b></div>
								</div>`;
						}
					} else if (link.type === 'video') {
						slideHTML += `
							<div class="gallery">
								<video controls>
									<source src="${link.url}" type="video/mp4">
									Your browser does not support the video tag.
								</video>
								<div class="desc"><b>${link.text}</b></div>
							</div>`;
					}
				});
				slideHTML += `<br><br><br><br><br><br><br><br><br><br><br>`;
			}
			
			// Add description
			slideHTML += `<ul>`;
			project.description.forEach(desc => {
				slideHTML += `&nbsp;&nbsp;<li>${desc}</li>`;
			});
			
			// Add links at the end
			if (project.links && project.links.length > 0) {
				const linkTypes = project.links.filter(l => l.type === 'github' || l.type === 'devpost' || l.type === 'external');
				if (linkTypes.length > 0) {
					slideHTML += `&nbsp;&nbsp;<li>`;
					const linkTexts = linkTypes.map(l => `<a href="${l.url}" class="cursor">${l.text}</a>`);
					slideHTML += linkTexts.join(' | ');
					slideHTML += `</li>`;
				}
			}
			
			slideHTML += `</ul><br></div>`;
			
			// Insert before the prev button
			$('#myModallightbox2 .modal-content-lightbox .prev').before(slideHTML);
		});
		
		// Re-initialize the slideshow
		console.log('Software project slides inserted, initializing slideshow');
		showSlides2(1);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error('Error loading software projects:', textStatus, errorThrown);
	});
}

// Load Work Experience
function loadWorkExperience() {
	$.getJSON('data/work-experience.json', function(data) {
		console.log('Loading work experience:', data.experiences.length, 'experiences');
		$('#myModallightbox3 .modal-content-lightbox .mySlides3').remove();
		
		data.experiences.forEach((exp, index) => {
			const slideNumber = index + 1;
			const totalSlides = data.experiences.length;
			
			let slideHTML = `
				<div class="mySlides3" style="background-color: coral; font-size: 18px; color: white;">
					<div class="numbertext">${slideNumber}/${totalSlides}</div>
					<br>
					<h1 style="font-family:'Charmonman',cursive;text-align: center" class="music-icon">
						${exp.title}
					</h1>
					<h3 style="text-align: center">${exp.subtitle}</h3>
					<br><br>
					<ul>`;
			
			exp.description.forEach(desc => {
				slideHTML += `&nbsp;&nbsp;<li>${desc}</li>`;
			});
			
			slideHTML += `</ul><br></div>`;
			
			// Insert before the prev button
			$('#myModallightbox3 .modal-content-lightbox .prev').before(slideHTML);
		});
		
		// Re-initialize the slideshow
		console.log('Work experience slides inserted, initializing slideshow');
		showSlides3(1);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error('Error loading work experience:', textStatus, errorThrown);
	});
}

// Load Organizations
function loadOrganizations() {
	$.getJSON('data/organizations.json', function(data) {
		console.log('Loading organizations:', data.organizations.length, 'organizations');
		$('#myModallightbox4 .modal-content-lightbox .mySlides4').remove();
		
		data.organizations.forEach((org, index) => {
			const slideNumber = index + 1;
			const totalSlides = data.organizations.length;
			
			let slideHTML = `
				<div class="mySlides4" style="background-color: coral; font-size: 18px; color: white;">
					<div class="numbertext">${slideNumber}/${totalSlides}</div>
					<br>
					<h1 style="text-align: center" class="cursor">`;
			
			if (org.logo) {
				slideHTML += `<img src="${org.logo}" float="center">`;
			} else {
				slideHTML += `<img src="${org.image}" float="center">`;
			}
			
			slideHTML += `</h1><br>`;
			
			// Add links/galleries
			if (org.links && org.links.length > 0) {
				org.links.forEach(link => {
					if (link.type === 'document') {
						slideHTML += `
							<a href="${link.url}">
								<div class="gallery">
									<img src="${link.image}">
									<div class="desc" style="color: black"><b>${link.text}</b></div>
								</div>
							</a>`;
					} else if (link.type === 'image') {
						slideHTML += `
							<div class="gallery">
								<img src="${link.image}">
								<div class="desc" style="color: black"><b>${link.text}</b></div>
							</div>`;
					} else if (link.type === 'video') {
						slideHTML += `
							<div class="gallery">
								<video controls>
									<source src="${link.url}" type="video/mp4">
									Your browser does not support the video tag.
								</video>
								<div class="desc">${link.text}</div>
							</div>`;
					}
				});
				slideHTML += `<br><br><br><br><br><br><br><br><br><br><br>`;
			}
			
			slideHTML += `
				<ul style="color:black">
					&nbsp;&nbsp;<li>Position: ${org.position}</li>
					&nbsp;&nbsp;<li>About the Club: ${org.description}</li>
					&nbsp;&nbsp;<li>My role: ${org.role}</li>`;
			
			// Add external links
			if (org.links && org.links.length > 0) {
				const externalLinks = org.links.filter(l => l.type === 'external' || l.type === 'linkedin');
				if (externalLinks.length > 0) {
					slideHTML += `&nbsp;&nbsp;<li>`;
					const linkTexts = externalLinks.map(l => `<a href="${l.url}" class="cursor">${l.text}</a>`);
					slideHTML += linkTexts.join(' | ');
					slideHTML += `</li>`;
				}
			}
			
			slideHTML += `</ul><br><br></div>`;
			
			// Insert before the prev button
			$('#myModallightbox4 .modal-content-lightbox .prev').before(slideHTML);
		});
		
		// Re-initialize the slideshow
		console.log('Organization slides inserted, initializing slideshow');
		showSlides4(1);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error('Error loading organizations:', textStatus, errorThrown);
	});
}

// Load Hobbies
function loadHobbies() {
	$.getJSON('data/hobbies.json', function(data) {
		console.log('Loading hobbies:', data.hobbies.length, 'hobbies');
		$('#myModallightbox5 .modal-content-lightbox .mySlides5').remove();
		
		data.hobbies.forEach((hobby, index) => {
			const slideNumber = index + 1;
			const totalSlides = data.hobbies.length;
			
			let slideHTML = `<div class="mySlides5 ${hobby.cssClass}"`;
			
			// Add background image if exists
			if (hobby.backgroundImage) {
				slideHTML += ` style="background: url(${hobby.backgroundImage}) no-repeat; background-size: auto;"`;
			}
			
			slideHTML += `>
				<div class="numbertext">${slideNumber}/${totalSlides}</div>
				<br>`;
			
			// Add title with icons
			if (hobby.icon) {
				const titleColor = hobby.titleColor || 'white';
				let iconClass = hobby.title === 'Music' ? 'music-icon' : (hobby.title === 'Art' ? 'writing-icon' : '');
				
				slideHTML += `<h1 style="font-family:'Charmonman',cursive;text-align: center;${hobby.titleColor ? ' color: ' + hobby.titleColor + ';' : ''}" class="${iconClass}">`;
				
				// Handle different icon types
				if (hobby.icon.type === 'glyphicon-music') {
					hobby.icon.sizes.forEach(size => {
						slideHTML += `<span class="glyphicon glyphicon-music" style="font-size:${size}px;"></span>`;
					});
				} else if (hobby.icon.type === 'glyphicon-pencil' && hobby.icon.additionalIcons) {
					// Art icons
					slideHTML += `<span class="glyphicon glyphicon-book" style="font-size:12px;"></span>`;
					hobby.icon.sizes.forEach(size => {
						slideHTML += `<span class="glyphicon glyphicon-pencil" style="font-size:${size}px;"></span>`;
					});
				} else if (hobby.icon.type === 'glyphicon-globe') {
					// Travelling icons
					slideHTML += `<span class="glyphicon glyphicon-globe" style="font-size:30px;"></span>`;
					slideHTML += `<span class="glyphicon glyphicon-plane" style="font-size:24px;"></span>`;
					slideHTML += `<br>${hobby.title}`;
				}
				
				slideHTML += `</h1>`;
			}
			
			// Add description (for Music)
			if (hobby.description) {
				slideHTML += `<p style="font-size: 18px; color:white;">`;
				hobby.description.forEach(desc => {
					slideHTML += `&nbsp;&nbsp;&nbsp;&nbsp; ${desc}<br>`;
				});
				slideHTML += `</p>`;
			}
			
			// Add section title
			if (hobby.sectionTitle) {
				const titleColor = hobby.titleColor || 'white';
				slideHTML += `
					<br><br>
					<h1 style="font-family:'Charmonman',cursive; font-size: 30px; color: ${titleColor};">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${hobby.sectionTitle}
					</h1>`;
			}
			
			// Add videos (for Music)
			if (hobby.videos && hobby.videos.length > 0) {
				hobby.videos.forEach(video => {
					slideHTML += `
						<div class="gallery">
							<video controls>
								<source src="${video.url}" type="video/mp4">
								Your browser does not support the video tag.
							</video>
							<div class="desc">${video.title}</div>
						</div>`;
				});
				
				slideHTML += `<br><br><br><br><br><br><br><br><br><br><br><br><br><br>`;
				
				// Add links
				if (hobby.links && hobby.links.length > 0) {
					hobby.links.forEach(link => {
						slideHTML += `
							<p style="color: white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								${link.text}
								<a href="${link.url}">
									<img src="${link.image}">
								</a>
							</p>`;
					});
				}
			}
			
			// Add images (for Art)
			if (hobby.images && hobby.images.length > 0) {
				hobby.images.forEach(image => {
					slideHTML += `
						<div class="gallery">
							<img src="${image.url}">
							<div class="desc" style="color: black"><b>${image.title}</b></div>
						</div>`;
				});
				slideHTML += `<br><br><br><br><br> <br><br><br><br><br> <br><br><br><br><br> <br><br>`;
			}
			
			// Add activities list (for Travelling)
			if (hobby.activities && hobby.activities.length > 0) {
				slideHTML += `<br><br><ul>`;
				hobby.activities.forEach(activity => {
					slideHTML += `<li>${activity}</li>`;
				});
				slideHTML += `</ul><br><br>`;
			}
			
			// Add last visit info (for Travelling)
			if (hobby.lastVisit) {
				slideHTML += `
					<h1 style="font-family:'Charmonman',cursive; font-size: 25px;">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My Last Visit: ${hobby.lastVisit}
					</h1>
					<br><br><br><br><br> <br><br><br><br><br> <br><br><br><br><br> <br><br>`;
			}
			
			slideHTML += `<br></div>`;
			
			// Insert before the prev button
			$('#myModallightbox5 .modal-content-lightbox .prev').before(slideHTML);
		});
		
		// Re-initialize the slideshow
		console.log('Hobbies slides inserted, initializing slideshow');
		showSlides5(1);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error('Error loading hobbies:', textStatus, errorThrown);
	});
}