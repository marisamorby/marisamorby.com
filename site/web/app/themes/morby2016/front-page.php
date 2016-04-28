
    <section class="call-to-action"
             style="background-image: url(/app/uploads/temp/opt-in.jpg);">
      <h2 class="call-to-action__heading">
        This Is the Headline That Offers an Immediate Benefit to the Reader
      </h2>
      <p class="call-to-action__text">
        Copy explaining why the benefit is crucial, and why the reader would be leaving a lot of value on the table if they <em>don’t</em> get this. <strong>Enter your name and email to get <em>instant access</em>.</strong>
      </p>
      <form action="" class="call-to-action__form">
        <div class="call-to-action__input-group">
          <label for="fname" class="call-to-action__label">
            First Name
          </label>
          <input type="text" id="fname" placeholder="First Name..."
                 class="call-to-action__input" />
        </div>
        <div class="call-to-action__input-group">
          <label for="fname" class="call-to-action__label">
            Email
          </label>
          <input type="email" id="email" placeholder="Email Address..."
                 class="call-to-action__input" />
        </div>
        <input type="submit" class="call-to-action__button button" value="Get the Thing" />
      </form>
    </section>

    <section class="credibility">

      <div class="credibility__section worked-with">
        <h2 class="credibility__heading">I&rsquo;ve worked with (and been featured by) great companies, including&hellip;</h2>
        <ul class="worked-with__companies">
          <li class="worked-with__company">
            <img src="<?= get_template_directory_uri() ?>/assets/images/jobhero.svg"
                 alt="Featured on JobHero"
                 class="worked-with__company-logo">
          </li>
          <li class="worked-with__company">
            <img src="<?= get_template_directory_uri() ?>/assets/images/lifehack.png"
                 alt="Featured on Lifehack"
                 class="worked-with__company-logo">
          </li>
          <li class="worked-with__company">
            <img src="<?= get_template_directory_uri() ?>/assets/images/ww_huffington-post.png"
                 alt="Featured on The Huffington Post"
                 class="worked-with__company-logo">
          </li>
          <li class="worked-with__company">
            <img src="<?= get_template_directory_uri() ?>/assets/images/nuschool.png"
                 alt="Worked with The nuSchool"
                 class="worked-with__company-logo">
          </li>
          <li class="worked-with__company">
            <img src="<?= get_template_directory_uri() ?>/assets/images/the-muse.png"
                 alt="Featured on The Muse"
                 class="worked-with__company-logo">
          </li>
          <li class="worked-with__company">
            <img src="<?= get_template_directory_uri() ?>/assets/images/linkedinpulse.png"
                 alt="Featured on LinkedIn Pulse"
                 class="worked-with__company-logo">
          </li>
        </ul>
      </div>

      <div class="credibility__section">
        <h2 class="credibility__heading">Also: people like me.</h2>
        <div class="testimonials">
          <blockquote class="testimonials__testimonial">
            <p class="testimonials__quote">
              &ldquo;Working with Marisa was like a really, <em>really</em> good butt massage. She just gets right up in there, but without making it uncomfortable.&rdquo;
            </p>
            <figure class="testimonials__attribution">
              <img src="<?= get_template_directory_uri() ?>/assets/images/jason-lengstorf-200.jpg"
                   alt="Jason L"
                   class="testimonials__attribution-photo">
              <figcaption class="testimonials__attribution-text">
                <strong class="testimonials__attribution-name">Jason L.</strong>
                <em class="testimonials__attribution-company">Bearstone</em>
              </figcaption>
            </figure>
          </blockquote>
          <blockquote class="testimonials__testimonial">
            <p class="testimonials__quote">
              &ldquo;Marisa is exactly the right person for your marketing needs. Or if you drop something between the seats in your car; she's got these tiny little hands, so she can fit them into tight spaces.&rdquo;
            </p>
            <figure class="testimonials__attribution">
              <img src="<?= get_template_directory_uri() ?>/assets/images/nate-green-200.jpg"
                   alt="Jason L"
                   class="testimonials__attribution-photo">
              <figcaption class="testimonials__attribution-text">
                <strong class="testimonials__attribution-name">Nate G.</strong>
                <em class="testimonials__attribution-company">Refocus</em>
              </figcaption>
            </figure>
          </blockquote>
        </div>
      </div>

    </section>
