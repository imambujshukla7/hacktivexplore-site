<script lang="ts">
	import "@splidejs/svelte-splide/css";
	import { onMount } from "svelte";
	import { createClient } from "@sanity/client";
	import { Splide, SplideSlide } from "@splidejs/svelte-splide";

	export const client = createClient({
		projectId: "tg81xdg5",
		dataset: "production",
		useCdn: true,
		apiVersion: "2023-08-23",
	});

	let data: main;

	interface main {
		videos: videos[];
	}

	interface videos {
		title: string;
		url: string;
		image: string;
	}

	let vlist: videos[] = [];

	onMount(async () => {
		data = await client.fetch(`*[_type == "hacktivExplore" ] {
  videos[]  {
    title,
    url,
    "image" : image.asset -> url
  }
}
`);
		data = data[0];
		vlist = data.videos;
	});
</script>

<div class="mx-auto mt-16">
	<h1 class=" text-center font-semibold text-2xl pb-8">Watch, Explore, Grow</h1>
	<Splide
		options={{
			arrows: false,
			pagination: false,
			type: "loop",
			speed: 1200,

			perPage: 3,
			breakpoints: {
				"640": {
					perPage: 1,
				},
				"768": {
					perPage: 3,
				},
				"1024": {
					perPage: 4,
				},
			},
			gap: "3rem",
			autoplay: true,
			interval: 1500,
			perMove: 1,
		}}
		class="flex    hover:transition-all  mx-auto duration-300 flex-wrap gap-6 md:gap-9 justify-center align-middle">
		{#each vlist as item}
			<SplideSlide>
				<div>
					<a href={item.url}>
						<img src={item.image} class="rounded-2xl" alt="" />

						<div class=" px-2 py-1 text-center z-10 text-xl font-semibold text-black">{item.title}</div>

						<div class="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
								<mask id="ipSPlay0">
									<g fill="none" stroke-linejoin="round" stroke-width="4">
										<path
											fill="#fff"
											stroke="#fff"
											d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
										<path fill="#000" stroke="#000" d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464V24Z" />
									</g>
								</mask>
								<path fill="white" d="M0 0h48v48H0z" mask="url(#ipSPlay0)" />
							</svg>
						</div>
					</a>
				</div>
			</SplideSlide>
		{/each}
	</Splide>
</div>
