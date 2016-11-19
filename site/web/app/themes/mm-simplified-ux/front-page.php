<?php

$asset_dir = get_template_directory_uri() . '/dist';

while (have_posts()):
  the_post();

?>
    <section class="intro">
        <h1 class="intro__heading">
            Hi, I’m <strong>Marisa Morby</strong>.
        </h1>
        <h2 class="intro__subheading">
            I’m a UX Researcher &amp; Designer.
        </h2>
        <img class="intro__photo"
             src="<?= $asset_dir; ?>/images/marisa-morby.jpg"
             srcset="<?= $asset_dir; ?>/images/marisa-morby.jpg 1x,
                     <?= $asset_dir; ?>/images/marisa-morby@2x.jpg 2x"
             alt="Marisa Morby UX Designer">
        <div class="intro__lede">
            <p class="intro__text">
                I believe in staying curious, learning constantly, and never
                giving up. I use my trademark combination of tenacity,
                people-centered problem solving, and devastating cuteness to
                solve UX/UI, marketing, and front-end development challenges.
            </p>
            <p class="intro__text">
                <strong>I’m currently available for hire for UX Research, UX Design,
                and Product Development.</strong> Want to see if we’d be a good fit?
                <a class="intro__link" href="/contact/">Shoot me an email!</a>
            </p>
        </div>
        <div class="intro__social">
            <a class="intro__icon-link"
               href="https://linkedin.com/in/marisamorby">
                <img class="intro__icon"
                     src="<?= $asset_dir ?>/images/icon-linkedin.svg"
                     alt="Marisa Morby on LinkedIn">
            </a>
            <a class="intro__icon-link"
               href="https://twitter.com/marisamorby">
                <img class="intro__icon"
                     src="<?= $asset_dir ?>/images/icon-twitter.svg"
                     alt="Marisa Morby on Twitter">
            </a>
        </div>
    </section>

    <section class="skillz">
        <div class="skillz__group">
            <img class="skillz__icon"
                 src="<?= $asset_dir; ?>/images/icon-research.svg"
                 alt="Skill: Research">
            <h3 class="skillz__heading">Research</h3>
            <ul class="skillz__list">
                <li class="skillz__item">Jobs To Be Done Interviewing</li>
                <li class="skillz__item">Research Analysis</li>
                <li class="skillz__item">Data-Driven Split Testing</li>
                <li class="skillz__item">User Research</li>
                <li class="skillz__item">User Testing</li>
            </ul>
        </div>
        <div class="skillz__group">
            <img class="skillz__icon"
                 src="<?= $asset_dir; ?>/images/icon-design.svg"
                 alt="Skill: Design">
            <h3 class="skillz__heading">Design</h3>
            <ul class="skillz__list">
                <li class="skillz__item">Interaction Design</li>
                <li class="skillz__item">Information Architecture</li>
                <li class="skillz__item">Visual Design</li>
                <li class="skillz__item">Interactive Prototyping</li>
                <li class="skillz__item">Wireframing</li>
            </ul>
        </div>
        <div class="skillz__group">
            <img class="skillz__icon"
                 src="<?= $asset_dir; ?>/images/icon-front-end.svg"
                 alt="Skill: Front-End Development">
            <h3 class="skillz__heading">Front-End</h3>
            <ul class="skillz__list">
                <li class="skillz__item">Hand-Coding HTML &amp; CSS</li>
                <li class="skillz__item">Vanilla JavaScript</li>
                <li class="skillz__item">Source Control with GitHub</li>
                <li class="skillz__item">WordPress</li>
                <li class="skillz__item">CLI Build Tools</li>
            </ul>
        </div>
    </section>

    <section class="how-i-work">
        <h2 class="how-i-work__heading">How I Approach Projects</h2>
        <div class="columns columns--2">
            <div class="columns__column work-sample">
                <a href="/case-studies/fix-your-own-back/" class="work-sample__image-link">
                    <img class="work-sample__image"
                         src="<?= $asset_dir; ?>/images/work-fyob.jpg"
                         srcset="<?= $asset_dir; ?>/images/work-fyob@0.5x.jpg 0.5x,
                                 <?= $asset_dir; ?>/images/work-fyob.jpg 1x,
                                 <?= $asset_dir; ?>/images/work-fyob@2x.jpg 2x"
                         alt="Work Sample: Fix Your Own Back">
                </a>
                <h3 class="work-sample__heading">Fix Your Own Back</h3>
                <p class="work-sample__lede">
                    I helped Dr. Snell speak to people like, y’know, a people.
                    Now his customers know how he can help.
                </p>
                <a class="work-sample__link"
                   href="/case-studies/fix-your-own-back/">Read the Case Study &rsaquo;</a>
            </div>
            <div class="columns__column work-sample">
                <a href="/case-studies/unfuck-my-email/" class="work-sample__image-link">
                    <img class="work-sample__image"
                         src="<?= $asset_dir; ?>/images/work-ufe.jpg"
                         srcset="<?= $asset_dir; ?>/images/work-ufe@0.5x.jpg 0.5x,
                                 <?= $asset_dir; ?>/images/work-ufe.jpg 1x,
                                 <?= $asset_dir; ?>/images/work-ufe@2x.jpg 2x"
                         alt="Work Sample: Unfuck My Email">
                </a>
                <h3 class="work-sample__heading">Unfuck My Email</h3>
                <p class="work-sample__lede">
                    Email sucks. So I made a tool to help freelancers get their
                    5 minutes back. You’re welcome.
                </p>
                <a class="work-sample__link"
                   href="/case-studies/unfuck-my-email/">Read the Case Study &rsaquo;</a>
            </div>
        </div>
    </section>

    <section class="clients">
        <h2 class="clients__heading">Meet My Happy Clients</h2>
        <div class="columns columns--3">
            <div class="columns__column testimonial">
                <blockquote class="testimonial__text">
                    <p>
                        Marisa has been an invaluable resource helping me with the
                        whole business process. I feel more confident moving forward
                        with the idea of starting my own business than I did trying
                        to piece it together on my own. I got more than I expected!
                    </p>
                </blockquote>
                <div class="testimonial__attribution">
                    <div class="testimonial__image-wrap">
                        <img class="testimonial__photo"
                             src="<?= $asset_dir ?>/images/client-atim.jpg"
                             srcset="<?= $asset_dir ?>/images/client-atim@0.5x.jpg 0.5x,
                                     <?= $asset_dir ?>/images/client-atim.jpg 1x,
                                     <?= $asset_dir ?>/images/client-atim@2x.jpg 2x"
                             alt="Client Name" />
                    </div>
                    <p class="testimonial__name">
                        Atim E.
                        <span class="testimonial__business">EffiFit</span>
                    </p>
                </div>
            </div>
            <div class="columns__column testimonial">
                <blockquote class="testimonial__text">
                    <p>
                        I am so happy! I really enjoyed working with Marisa, and
                        it’s helped to have someone walk me through the process I
                        usually walk my clients through. I look forward to hiring
                        Marisa again!
                    </p>
                </blockquote>
                <div class="testimonial__attribution">
                    <div class="testimonial__image-wrap">
                        <img class="testimonial__photo"
                             src="<?= $asset_dir ?>/images/client-glenda.jpg"
                             srcset="<?= $asset_dir ?>/images/client-glenda@0.5x.jpg 0.5x,
                                     <?= $asset_dir ?>/images/client-glenda.jpg 1x,
                                     <?= $asset_dir ?>/images/client-glenda@2x.jpg 2x"
                             alt="Client Name" />
                    </div>
                    <p class="testimonial__name">
                        Glenda H.
                        <span class="testimonial__business">Drip Drop Creative</span>
                    </p>
                </div>
            </div>
            <div class="columns__column testimonial">
                <blockquote class="testimonial__text">
                    <p>
                        With too many irons in the fire, I needed help managing the
                        marketing as we prepared for a product launch. What a breath
                        of fresh air Marisa was! Responsible, punctual, and
                        incredibly productive in a short period of time, she wowed
                        me with her work.
                    </p>
                </blockquote>
                <div class="testimonial__attribution">
                    <div class="testimonial__image-wrap">
                        <img class="testimonial__photo"
                             src="<?= $asset_dir ?>/images/client-dr-snell.jpg"
                             srcset="<?= $asset_dir ?>/images/client-dr-snell@0.5x.jpg 0.5x,
                                     <?= $asset_dir ?>/images/client-dr-snell.jpg 1x,
                                     <?= $asset_dir ?>/images/client-dr-snell@2x.jpg 2x"
                             alt="Client Name" />
                    </div>
                    <p class="testimonial__name">
                        Dr. Snell
                        <span class="testimonial__business">Fix Your Own Back</span>
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="contact-me">
        <h2 class="contact-me__heading">Let’s Do Amazing Work Together</h2>
        <a class="contact-me__button u-button"
           href="/contact/">Contact Me</a>
    </section>
<?php

endwhile;
