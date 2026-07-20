/* =========================================================================
   Nikola Popovic — SITE DATA (edit this file to add / update content)
   =========================================================================

   This is the ONLY file you need to touch to add or edit a publication /
   project. It defines the data; assets/app.js renders it. No build step is
   required after editing this file — just refresh the page.

   -------------------------------------------------------------------------
   HOW TO ADD A NEW PROJECT
   -------------------------------------------------------------------------
   Add an object to the PROJECTS array below (newest first is nice, but the
   grid auto-sorts by `year` descending anyway). Fields:

     title    : string  — the paper/project title (shown as the card heading).
     authors  : array   — keys into the AUTHORS map below (order preserved).
                          Add a trailing "*" to a key for equal-contribution,
                          e.g. 'yue_li*'. If a key is missing from AUTHORS the
                          raw key is printed, so add the person to AUTHORS.
     conf     : string  — key into the CONFERENCES map (e.g. 'cvpr'). Add new
                          venues to CONFERENCES.
     year     : number  — publication year (drives sorting).
     note     : string  — small extra venue text, e.g. ' · PhD Thesis'. Leave
                          '' for none. (For Orals/Awards prefer `badges`.)
     media    : object  — OPTIONAL. { type:'image'|'video', src:'path' }. Images
                          are lazy-loaded; videos autoplay muted when scrolled
                          in. Omit the field entirely if there's no teaser — the
                          card then renders text-only at full width.
     links    : array   — [{ label, url }]. The icon is auto-picked from the
                          label ("Code"→code, "Web/Site/Project/Page"→globe,
                          otherwise a paper icon). A BibTeX button is added
                          automatically when `bibtex` is set.
     bibtex   : string  — key into the BIBTEX map (the full citation string).
     tags     : array   — topic pills + filter keys. Known: '3D','Ego',
                          '2D' (styled in TAG_STYLES). Add a new tag
                          to TAG_STYLES + FILTERS to make it filterable.
     important: boolean  — true = shown in the default "Selected" view.

     badges   : array   — OPTIONAL. Prominent, eye-catching pills shown above
                          the title. Each: { kind, label, pct }.
                            kind : 'oral'  → orange pill; the rate is shown as
                                             "top <pct>" automatically
                                   'award' → red pill (extra attention); never
                                             shows a percentage
                            label: text, e.g. 'Oral' or 'Award Nominee'
                            pct  : oral only — the bare rate, e.g. '0.88%'
                                   (displayed as "top 0.88%"). Ignored for award.
                          Example:
                            badges: [
                              { kind:'oral',  label:'Oral',          pct:'0.88%' },
                              { kind:'award', label:'Award Nominee' }
                            ]
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- Authors */
  var AUTHORS = {
    nikola_popovic: '<strong>Nikola Popovic</strong>',
    yue_li: '<a href="https://unique1i.github.io" target="_blank" rel="noopener">Yue Li</a>',
    qi_ma: '<a href="https://qimaqi.github.io" target="_blank" rel="noopener">Qi Ma</a>',
    runyi_yang: '<a href="https://runyiyang.github.io" target="_blank" rel="noopener">Runyi Yang</a>',
    mengjiao_ma: '<a href="https://scholar.google.com/citations?user=4_JSQPQAAAAJ" target="_blank" rel="noopener">Mengjiao Ma</a>',
    bin_ren: '<a href="https://amazingren.github.io" target="_blank" rel="noopener">Bin Ren</a>',
    nicu_sebe: '<a href="https://disi.unitn.it/~sebe/" target="_blank" rel="noopener">Nicu Sebe</a>',
    theo_gevers: '<a href="https://staff.science.uva.nl/th.gevers/" target="_blank" rel="noopener">Theo Gevers</a>',
    luc_van_gool: '<a href="https://insait.ai/prof-luc-van-gool/" target="_blank" rel="noopener">Luc Van Gool</a>',
    danda_paudel: '<a href="https://insait.ai/dr-danda-paudel/" target="_blank" rel="noopener">Danda Pani Paudel</a>',
    martin_r_oswald: '<a href="https://oswaldm.github.io" target="_blank" rel="noopener">Martin R. Oswald</a>',
    jiahuan_cheng: '<a href="https://scholar.google.com/citations?user=Q225cH0AAAAJ" target="_blank" rel="noopener">Jiahuan Cheng</a>',
    mingqiang_wei: '<a href="https://scholar.google.com/citations?user=TdrJj8MAAAAJ" target="_blank" rel="noopener">Mingqiang Wei</a>',
    huapeng_li: '<a href="https://scholar.google.com/citations?user=LkF7__QAAAAJ" target="_blank" rel="noopener">Huapeng Li</a>',
    ender_konukoglu: '<a href="https://people.ee.ethz.ch/~kender/" target="_blank" rel="noopener">Ender Konukoglu</a>',
    dimitrios_christodoulou: '<a href="https://www.linkedin.com/in/dimitris-christodoulou-09383118b/" target="_blank" rel="noopener">Dimitrios Christodoulou</a>',
    xi_wang: '<a href="https://xiwang1212.github.io/homepage/" target="_blank" rel="noopener">Xi Wang</a>',
    thomas_probst: '<a href="https://probstt.bitbucket.io" target="_blank" rel="noopener">Thomas Probst</a>',
    ritika_chakraborty: '<a href="https://www.linkedin.com/in/ritika-chakraborty-691119208" target="_blank" rel="noopener">Ritika Chakraborty</a>',
    guolei_sun: '<a href="https://guoleisun.github.io" target="_blank" rel="noopener">Guolei Sun</a>',
    marko_mihajlovic: '<a href="https://markomih.github.io" target="_blank" rel="noopener">Marko Mihajlovic</a>',
    // RouteFormer (ICLR 2025) co-authors
    m_eren_akbiyik: '<a href="https://meakbiyik.com" target="_blank" rel="noopener">M. Eren Akbiyik</a>',
    nedko_savov: '<a href="https://scholar.google.com/citations?user=6zIcUgkAAAAJ&hl=en" target="_blank" rel="noopener">Nedko Savov</a>',
    christian_vater: '<a href="https://scholar.google.com/citations?user=n0fsp3UAAAAJ&hl=en" target="_blank" rel="noopener">Christian Vater</a>',
    otmar_hilliges: '<a href="https://ait.ethz.ch/people/hilliges" target="_blank" rel="noopener">Otmar Hilliges</a>',
    // Task Switching (ICCV 2021) & Crowd Counting (MIR 2024) co-authors
    yun_liu: 'Yun Liu',
    menelaos_kanakis: 'Menelaos Kanakis',
    jagruti_patel: 'Jagruti Patel',
    dengxin_dai: 'Dengxin Dai'
  };

  /* ------------------------------------------------------------ Conferences */
  var CONFERENCES = {
    cvpr: { abbr: 'CVPR' },
    cvprw: { abbr: 'CVPR-W' },
    iccv: { abbr: 'ICCV' },
    neurips: { abbr: 'NeurIPS' },
    iclr: { abbr: 'ICLR' },
    ismar: { abbr: 'ISMAR' },
    icip: { abbr: 'ICIP' },
    wacv: { abbr: 'WACV' },
    melcon: { abbr: 'MELECON' },
    ethrc: { abbr: 'ETH Zürich' },
    mir: { abbr: 'Machine Intelligence Research' }
  };

  /* --------------------------------------------------------------- Tags ---- */
  // Topic tags shown on cards + used as filters. "important" is a hidden flag
  // (see PROJECTS) that drives the default "Selected" view — it is never
  // rendered as a per-card label.
  var TAG_STYLES = {
    '3D': 'text-blue-700 bg-blue-50 ring-blue-200 dark:text-blue-300 dark:bg-blue-950 dark:ring-blue-900',
    'Ego': 'text-emerald-700 bg-emerald-50 ring-emerald-200 dark:text-emerald-300 dark:bg-emerald-950 dark:ring-emerald-900',
    '2D': 'text-violet-700 bg-violet-50 ring-violet-200 dark:text-violet-300 dark:bg-violet-950 dark:ring-violet-900'
  };

  var FILTERS = [
    { key: 'selected', label: 'Selected' },
    { key: 'all', label: 'All' },
    { key: '3D', label: '3D' },
    { key: 'Ego', label: 'Ego' },
    { key: '2D', label: '2D' }
  ];

  /* ------------------------------------------------------------- BibTeX ---- */
  var BIBTEX = {
    chorus: '@inproceedings{li2026chorus,\n  title={Chorus: Multi-Teacher Pretraining for Holistic 3D Gaussian Scene Encoding},\n  author={Li, Yue and Ma, Qi and Yang, Runyi and Ma, Mengjiao and Ren, Bin and Popovic, Nikola and Sebe, Nicu and Gevers, Theo and Van Gool, Luc and Paudel, Danda Pani and Oswald, Martin R.},\n  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},\n  year={2026}\n}',
    scenesplatpp: '@inproceedings{ma2025scenesplatpp,\n  title={SceneSplat++: A Large Dataset and Comprehensive Benchmark for Language Gaussian Splatting},\n  author={Ma, Mengjiao and Ma, Qi and Li, Yue and Cheng, Jiahuan and Yang, Runyi and Ren, Bin and Popovic, Nikola and Wei, Mingqiang and Sebe, Nicu and Van Gool, Luc and Gevers, Theo and Oswald, Martin R. and Paudel, Danda Pani},\n  booktitle={Proceedings of the 39th Conference on Neural Information Processing Systems (NeurIPS 2025)},\n  year={2025}\n}',
    scenesplat: '@inproceedings{li2025scenesplat,\n  title={SceneSplat: Gaussian Splatting-based Scene Understanding With Vision-Language Pretraining},\n  author={Li, Yue and Ma, Qi and Yang, Runyi and Li, Huapeng and Ma, Mengjiao and Ren, Bin and Popovic, Nikola and Sebe, Nicu and Konukoglu, Ender and Gevers, Theo and others},\n  booktitle={Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)},\n  year={2025}\n}',
    routeformer: '@inproceedings{akbiyik2025routeformer,\n  title={Leveraging Driver Field-of-View for Multimodal Ego-Trajectory Prediction},\n  author={Akbiyik, M. Eren and Savov, Nedko and Paudel, Danda Pani and Popovic, Nikola and Vater, Christian and Hilliges, Otmar and Van Gool, Luc and Wang, Xi},\n  booktitle={International Conference on Learning Representations (ICLR)},\n  year={2025}\n}',
    phd_thesis: '@phdthesis{popovic2024dense,\n  author={Popovic, Nikola},\n  title={Dense, Sparse, and Weak Labels for Visual Understanding and Generation},\n  school={ETH Zurich},\n  year={2024},\n  type={Doctoral Thesis},\n  doi={10.3929/ethz-b-000707393}\n}',
    manhattan: '@inproceedings{Popovic23ManhattanDF,\n  title={Surface Normal Clustering for Implicit Representation of Manhattan Scenes},\n  author={Popovic, Nikola and Paudel, Danda Pani and Van Gool, Luc},\n  year={2023},\n  booktitle={IEEE/CVF International Conference on Computer Vision (ICCV)}\n}',
    eye_gaze: '@inproceedings{modelaware3deye,\n  title={Model-aware 3D Eye Gaze from Weak and Few-shot Supervisions},\n  author={Popovic, Nikola and Christodoulou, Dimitrios and Paudel, Danda Pani and Wang, Xi and Van Gool, Luc},\n  booktitle={IEEE International Symposium on Mixed and Augmented Reality (ISMAR)},\n  year={2023}\n}',
    token_dropout: '@inproceedings{10222084,\n  author={Popovic, Nikola and Paudel, Danda Pani and Probst, Thomas and Van Gool, Luc},\n  booktitle={2023 IEEE International Conference on Image Processing (ICIP)},\n  title={Token-Consistent Dropout For Calibrated Vision Transformers},\n  year={2023},\n  pages={1030-1034},\n  doi={10.1109/ICIP49359.2023.10222084}\n}',
    conditional_gen: '@InProceedings{Popovic_2023_WACV,\n  author={Popovic, Nikola and Chakraborty, Ritika and Paudel, Danda Pani and Probst, Thomas and Van Gool, Luc},\n  title={Spatially Multi-Conditional Image Generation},\n  booktitle={Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)},\n  year={2023},\n  pages={734-743}\n}',
    obfuscation: '@inproceedings{Popovic22ChecklistTest,\n  title={Gradient Obfuscation Checklist Test Gives a False Sense of Security},\n  author={Popovic, Nikola and Paudel, Danda Pani and Probst, Thomas and Van Gool, Luc},\n  year={2022},\n  booktitle={IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops (CVPRW), The Art of Robustness}\n}',
    composite: '@InProceedings{Popovic_2021_CVPR,\n  author={Popovic, Nikola and Paudel, Danda Pani and Probst, Thomas and Sun, Guolei and Van Gool, Luc},\n  title={CompositeTasking: Understanding Images by Spatial Composition of Tasks},\n  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},\n  year={2021},\n  pages={6870-6880}\n}',
    fooling: '@inproceedings{8379110,\n  author={Mihajlovic, Marko and Popovic, Nikola},\n  booktitle={2018 19th IEEE Mediterranean Electrotechnical Conference (MELECON)},\n  title={Fooling a Neural Network with Common Adversarial Noise},\n  year={2018},\n  pages={293-296},\n  doi={10.1109/MELCON.2018.8379110}\n}',
    crowd_counting: '@article{sun2024rethinking,\n  title={Rethinking Global Context in Crowd Counting},\n  author={Sun, Guolei and Liu, Yun and Probst, Thomas and Paudel, Danda Pani and Popovic, Nikola and Van Gool, Luc},\n  journal={Machine Intelligence Research},\n  volume={21},\n  pages={640--651},\n  year={2024},\n  publisher={Springer}\n}',
    task_switching: '@inproceedings{sun2021task,\n  title={Task Switching Network for Multi-Task Learning},\n  author={Sun, Guolei and Probst, Thomas and Paudel, Danda Pani and Popovic, Nikola and Kanakis, Menelaos and Patel, Jagruti and Dai, Dengxin and Van Gool, Luc},\n  booktitle={Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)},\n  year={2021}\n}'
  };

  /* ------------------------------------------------------------- Projects -- */
  // tags[] = visible topic pills + filters. important = hidden "Selected" flag.
  var PROJECTS = [
    {
      title: 'Chorus: Multi-Teacher Pretraining for Holistic 3D Gaussian Scene Encoding',
      authors: ['yue_li*', 'qi_ma*', 'runyi_yang', 'mengjiao_ma', 'bin_ren', 'nikola_popovic', 'nicu_sebe', 'theo_gevers', 'luc_van_gool', 'danda_paudel', 'martin_r_oswald'],
      conf: 'cvpr', year: 2026, note: '',
      media: { type: 'image', src: 'assets/img/teaser_chorus.webp' },
      links: [
        { label: 'Website', url: 'https://gaussianworld.github.io/Chorus' },
        { label: 'Paper', url: 'https://arxiv.org/abs/2512.17817' },
        { label: 'Code', url: 'https://github.com/GaussianWorld/Chorus' }
      ],
      bibtex: 'chorus', tags: ['3D'], important: true,
      // TODO: replace X% / Y% with the real CVPR 2026 oral rate and award-nominee rate.
      badges: [
        { kind: 'oral', label: 'Oral', pct: '3.4%' },
        { kind: 'award', label: 'Award Nominee' }
      ]
    },
    {
      title: 'SceneSplat++: A Large Dataset and Comprehensive Benchmark for Language Gaussian Splatting',
      authors: ['mengjiao_ma*', 'qi_ma*', 'yue_li*', 'jiahuan_cheng', 'runyi_yang', 'bin_ren', 'nikola_popovic', 'mingqiang_wei', 'nicu_sebe', 'luc_van_gool', 'theo_gevers', 'martin_r_oswald', 'danda_paudel'],
      conf: 'neurips', year: 2025, note: '',
      media: { type: 'image', src: 'assets/img/teaser_scenesplatpp.webp' },
      links: [
        { label: 'Website', url: 'https://scenesplatpp.gaussianworld.ai' },
        { label: 'Paper', url: 'https://arxiv.org/abs/2506.08710' },
        { label: 'Code', url: 'https://github.com/GaussianWorld/SceneSplat_Benchmark' }
      ],
      bibtex: 'scenesplatpp', tags: ['3D'], important: true
    },
    {
      title: 'SceneSplat: Gaussian Splatting-based Scene Understanding with Vision-Language Pretraining',
      authors: ['yue_li*', 'qi_ma*', 'runyi_yang', 'huapeng_li', 'mengjiao_ma', 'bin_ren', 'nikola_popovic', 'nicu_sebe', 'ender_konukoglu', 'theo_gevers', 'luc_van_gool', 'martin_r_oswald', 'danda_paudel'],
      conf: 'iccv', year: 2025, note: '',
      media: { type: 'video', src: 'assets/demo_scenesplat.mp4' },
      links: [
        { label: 'Website', url: 'https://unique1i.github.io/SceneSplat_webpage/' },
        { label: 'Paper', url: 'https://arxiv.org/abs/2503.18052' },
        { label: 'Code', url: 'https://github.com/unique1i/SceneSplat' }
      ],
      bibtex: 'scenesplat', tags: ['3D'], important: true,
      // TODO: replace X% with the real ICCV 2025 oral acceptance rate.
      badges: [
        { kind: 'oral', label: 'Oral', pct: '2.4%' }
      ]
    },
    {
      title: 'Leveraging Driver Field-of-View for Multimodal Ego-Trajectory Prediction',
      authors: ['m_eren_akbiyik', 'nedko_savov', 'danda_paudel', 'nikola_popovic', 'christian_vater', 'otmar_hilliges', 'luc_van_gool', 'xi_wang'],
      conf: 'iclr', year: 2025, note: '',
      media: { type: 'image', src: 'assets/img/teaser_routeformer.webp' },
      links: [
        { label: 'Project', url: 'https://meakbiyik.com/routeformer' },
        { label: 'Paper', url: 'https://arxiv.org/abs/2312.08558' },
        { label: 'Code', url: 'https://github.com/meakbiyik/routeformer' }
      ],
      bibtex: 'routeformer', tags: ['Ego'], important: false
    },
    {
      title: 'Dense, Sparse, and Weak Labels for Visual Understanding and Generation',
      authors: ['nikola_popovic'],
      conf: 'ethrc', year: 2024, note: ' · PhD Thesis',
      media: { type: 'image', src: 'assets/img/teaser_phd_thesis.webp' },
      links: [{ label: 'Thesis', url: 'https://www.research-collection.ethz.ch/entities/publication/a0c0309e-1f3d-42c7-8adb-2627f9941d28' }],
      bibtex: 'phd_thesis', tags: ['3D', '2D'], important: false
    },
    {
      title: 'Rethinking Global Context in Crowd Counting',
      authors: ['guolei_sun', 'yun_liu', 'thomas_probst', 'danda_paudel', 'nikola_popovic', 'luc_van_gool'],
      conf: 'mir', year: 2024, note: '',
      media: { type: 'image', src: 'assets/img/teaser_crowd_counting.webp' },
      links: [
        { label: 'Paper', url: 'https://link.springer.com/article/10.1007/s11633-023-1475-z' },
        { label: 'arXiv', url: 'https://arxiv.org/abs/2105.10926' }
      ],
      bibtex: 'crowd_counting', tags: ['2D'], important: false
    },
    {
      title: 'Surface Normal Clustering for Implicit Representation of Manhattan Scenes',
      authors: ['nikola_popovic', 'danda_paudel', 'luc_van_gool'],
      conf: 'iccv', year: 2023, note: '',
      media: { type: 'image', src: 'assets/img/teaser_manhattan.webp' },
      links: [
        { label: 'Paper', url: 'https://arxiv.org/abs/2212.01331' },
        { label: 'Code', url: 'https://github.com/nikola3794/normal-clustering-nerf' }
      ],
      bibtex: 'manhattan', tags: ['3D'], important: true
    },
    {
      title: 'Model-aware 3D Eye Gaze from Weak and Few-shot Supervisions',
      authors: ['nikola_popovic*', 'dimitrios_christodoulou*', 'danda_paudel', 'xi_wang', 'luc_van_gool'],
      conf: 'ismar', year: 2023, note: '',
      media: { type: 'image', src: 'assets/img/teaser_eye_gaze.webp' },
      links: [
        { label: 'Paper', url: 'https://arxiv.org/abs/2311.12157' },
        { label: 'Code', url: 'https://github.com/dimitris-christodoulou57/Model-aware_3D_Eye_Gaze' }
      ],
      bibtex: 'eye_gaze', tags: ['3D'], important: false
    },
    {
      title: 'Token-Consistent Dropout for Calibrated Vision Transformers',
      authors: ['nikola_popovic', 'danda_paudel', 'thomas_probst', 'luc_van_gool'],
      conf: 'icip', year: 2023, note: '',
      media: { type: 'image', src: 'assets/img/teaser_token_dropout.webp' },
      links: [
        { label: 'Paper', url: 'https://ieeexplore.ieee.org/document/10222084' },
        { label: 'arXiv', url: 'https://arxiv.org/abs/2112.15111' }
      ],
      bibtex: 'token_dropout', tags: ['2D'], important: false
    },
    {
      title: 'Spatially Multi-Conditional Image Generation',
      authors: ['nikola_popovic*', 'ritika_chakraborty*', 'danda_paudel', 'thomas_probst', 'luc_van_gool'],
      conf: 'wacv', year: 2023, note: '',
      media: { type: 'image', src: 'assets/img/teaser_conditional_generation.webp' },
      links: [{ label: 'Paper', url: 'https://arxiv.org/abs/2203.13812' }],
      bibtex: 'conditional_gen', tags: ['2D'], important: true
    },
    {
      title: 'Gradient Obfuscation Checklist Test Gives a False Sense of Security',
      authors: ['nikola_popovic', 'danda_paudel', 'thomas_probst', 'luc_van_gool'],
      conf: 'cvprw', year: 2022, note: ' (Oral)',
      media: { type: 'image', src: 'assets/img/teaser_checklist.webp' },
      links: [
        { label: 'Paper', url: 'https://arxiv.org/abs/2206.01705' },
        { label: 'Code', url: 'https://github.com/nikola3794/checklist-test-obfuscation-analysis' }
      ],
      bibtex: 'obfuscation', tags: ['2D'], important: false
    },
    {
      title: 'CompositeTasking: Understanding Images by Spatial Composition of Tasks',
      authors: ['nikola_popovic', 'danda_paudel', 'thomas_probst', 'guolei_sun', 'luc_van_gool'],
      conf: 'cvpr', year: 2021, note: '',
      media: { type: 'image', src: 'assets/img/teaser_composite.webp' },
      links: [
        { label: 'Paper', url: 'https://arxiv.org/abs/2012.09030' },
        { label: 'Code', url: 'https://github.com/nikola3794/composite-tasking' }
      ],
      bibtex: 'composite', tags: ['2D'], important: true
    },
    {
      title: 'Task Switching Network for Multi-Task Learning',
      authors: ['guolei_sun', 'thomas_probst', 'danda_paudel', 'nikola_popovic', 'menelaos_kanakis', 'jagruti_patel', 'dengxin_dai', 'luc_van_gool'],
      conf: 'iccv', year: 2021, note: '',
      media: { type: 'image', src: 'assets/img/teaser_task_switching.webp' },
      links: [
        { label: 'Paper', url: 'https://openaccess.thecvf.com/content/ICCV2021/html/Sun_Task_Switching_Network_for_Multi-Task_Learning_ICCV_2021_paper.html' }
      ],
      bibtex: 'task_switching', tags: ['2D'], important: false
    },
    {
      title: 'Fooling a Neural Network with Common Adversarial Noise',
      authors: ['marko_mihajlovic*', 'nikola_popovic*'],
      conf: 'melcon', year: 2018, note: '',
      media: { type: 'image', src: 'assets/img/teaser_fooling.webp' },
      links: [
        { label: 'Paper', url: 'https://ieeexplore.ieee.org/abstract/document/8379110' },
        { label: 'Code', url: 'https://github.com/markomih/cnn_adv_examples' }
      ],
      bibtex: 'fooling', tags: ['2D'], important: false
    }
  ];

  /* ----------------------------------------------------- Expose to the app - */
  window.SITE_DATA = {
    AUTHORS: AUTHORS,
    CONFERENCES: CONFERENCES,
    TAG_STYLES: TAG_STYLES,
    FILTERS: FILTERS,
    BIBTEX: BIBTEX,
    PROJECTS: PROJECTS
  };
})();
