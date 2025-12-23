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
	loadEducation();
});

// Load Education
function loadEducation() {
	$.getJSON('data/education.json', function(data) {
		const container = $('#education-list');
		if (!container.length) return;

		container.empty();

		data.education.forEach(school => {
			let coursesList = '';
			if (school.courses && school.courses.length) {
				coursesList = `<p><strong>Courses:</strong> ${school.courses.join(', ')}</p>`;
			}

			let awardsList = '';
			if (school.awards && school.awards.length) {
				awardsList = `<p><strong>Awards:</strong> ${school.awards.join(', ')}</p>`;
			}

			const logoHtml = school.logo ? `
				<div class="media-left">
					<img class="education-logo" src="${school.logo}" alt="${school.institution} logo">
				</div>` : '';

			const panel = `
				<div class="panel panel-default">
					<div class="panel-body">
						<div class="media">
							${logoHtml}
							<div class="media-body">
								<h3>${school.institution} | ${school.location} <small>[${school.date}]</small></h3>
								<p><strong>${school.degree}</strong>${school.major ? ' — ' + school.major : ''}${school.track ? ' (' + school.track + ')' : ''}${school.gpa ? ' | <strong>GPA:</strong> ' + school.gpa : ''}</p>
								${coursesList}
								${awardsList}
							</div>
						</div>
					</div>
				</div>
			`;

			container.append(panel);
		});
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error('Error loading education:', textStatus, errorThrown);
	});
}

// Load Research Projects
function loadResearchProjects() {
	$.getJSON('data/research.json', function(data) {
		console.log('Loading research projects:', data.projects.length, 'projects');
		// Apply thumbnails to promo cards
		$('#research .promo-item').each((idx, el) => {
			const project = data.projects[idx];
			if (project) {
				$(el).css('background-image', `url(${project.thumbnail || project.image})`);
			}
		});

		const modalContent = $('#myModallightbox .modal-content-lightbox');
		// Remove existing slides and thumbs
		modalContent.find('.mySlides').remove();
		modalContent.find('.column-lightbox').remove();

		let thumbsHTML = '';
		
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
			modalContent.find('.prev').before(slideHTML);

			thumbsHTML += `
				<div class="column-lightbox">
					<img class="demo cursor" src="${project.thumbnail || project.image}" style="width:100%; height:100%; object-fit:cover;" onclick="currentSlide(${slideNumber})" alt="${project.title}">
				</div>`;
		});
		
		if (thumbsHTML) {
			modalContent.find('.caption-container').after(thumbsHTML);
		}

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
		// Apply thumbnails to promo cards
		$('#projects .promo-item').each((idx, el) => {
			const project = data.projects[idx];
			if (project) {
				$(el).css('background-image', `url(${project.thumbnail || project.image})`);
			}
		});

		const modalContent = $('#myModallightbox2 .modal-content-lightbox');
		modalContent.find('.mySlides2').remove();
		modalContent.find('.column-lightbox').remove();

		let thumbsHTML = '';
		
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
			modalContent.find('.prev').before(slideHTML);

			thumbsHTML += `
				<div class="column-lightbox">
					<img class="demo2 cursor" src="${project.thumbnail || project.image}" style="width:100%; height:100%; object-fit:cover;" onclick="currentSlide2(${slideNumber})" alt="${project.title}">
				</div>`;
		});
		
		if (thumbsHTML) {
			modalContent.find('.caption-container').after(thumbsHTML);
		}

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
		// Apply thumbnails to promo cards
		$('#work-ex .promo-item').each((idx, el) => {
			const exp = data.experiences[idx];
			if (exp) {
				$(el).css('background-image', `url(${exp.thumbnail || exp.image})`);
			}
		});

		const modalContent = $('#myModallightbox3 .modal-content-lightbox');
		modalContent.find('.mySlides3').remove();
		modalContent.find('.column-lightbox').remove();

		let thumbsHTML = '';
		
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
			modalContent.find('.prev').before(slideHTML);

			thumbsHTML += `
				<div class="column-lightbox">
					<img class="demo3 cursor" src="${exp.thumbnail || exp.image}" style="width:100%; height:100%; object-fit:cover;" onclick="currentSlide3(${slideNumber})" alt="${exp.title}">
				</div>`;
		});
		
		if (thumbsHTML) {
			modalContent.find('.caption-container').after(thumbsHTML);
		}

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
