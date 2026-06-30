// Static site content & brand constants used across pages.

export const LOGO_URL = "/manus-storage/prime_logo_a8c45322.png";
export const HERO_IMAGE = "/manus-storage/hero_industrial_maritime_8029b615.jpg";
export const DISTRIBUTOR_BADGE = "/manus-storage/distributor_badge_56fb8a9c.png";

export const CTA_INDUSTRY_IMG = "/manus-storage/cta_industry_3e0c5ede.jpg";
export const CTA_MARITIME_IMG = "/manus-storage/cta_maritime_c0222667.jpg";

export const CONTACT = {
  addressLine1: "90 D, Moutsopoulou Str",
  addressLine2: "Piraeus 18541, Greece",
  phone: "+30 210 4819800",
  phoneHref: "tel:+302104819800",
  email: "info@primeindustrial.gr",
  emailHref: "mailto:info@primeindustrial.gr",
};

export type ProductCategory = "metal-repair" | "coatings" | "elastomers" | "specialised";

export const PRODUCT_CATEGORIES: { key: ProductCategory; image: string }[] = [
  { key: "metal-repair", image: "/manus-storage/prod_metal_repair_dba10367.jpg" },
  { key: "coatings", image: "/manus-storage/prod_coatings_009fe2cf.jpg" },
  { key: "elastomers", image: "/manus-storage/prod_elastomers_1997693d.jpg" },
  { key: "specialised", image: "/manus-storage/prod_metal_repair_dba10367.jpg" },
];

export type Industry = {
  slug: string;
  image: string;
  titleEn: string;
  titleEl: string;
  bodyEn: string;
  bodyEl: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "oil-gas",
    image: "/manus-storage/ind_oil_gas_301fe14d.jpg",
    titleEn: "Oil & Gas",
    titleEl: "Πετρέλαιο & Αέριο",
    bodyEn:
      "Belzona epoxy-based metal repair composites, coatings and linings are formulated to repair and protect equipment common in the oil and gas industry — from pipework and storage tanks to pumps and heat exchangers.",
    bodyEl:
      "Τα σύνθετα επισκευής μετάλλων, οι επιστρώσεις και οι επενδύσεις Belzona με βάση την εποξειδική ρητίνη έχουν σχεδιαστεί για την επισκευή και προστασία εξοπλισμού στη βιομηχανία πετρελαίου και αερίου — από σωληνώσεις και δεξαμενές έως αντλίες και εναλλάκτες θερμότητας.",
  },
  {
    slug: "maritime",
    image: "/manus-storage/ind_maritime_7d445700.jpg",
    titleEn: "Maritime & Shipping",
    titleEl: "Ναυτιλία & Πλοία",
    bodyEn:
      "Protect and extend the life of vessels, ballast tanks, decks, pipework and machinery. Cold-applied Belzona solutions allow in-situ repairs without hot work, ideal for shipboard and shipyard maintenance.",
    bodyEl:
      "Προστατεύστε και επεκτείνετε τη διάρκεια ζωής πλοίων, δεξαμενών έρματος, καταστρωμάτων, σωληνώσεων και μηχανημάτων. Οι λύσεις Belzona ψυχρής εφαρμογής επιτρέπουν επιτόπιες επισκευές χωρίς θερμές εργασίες, ιδανικές για συντήρηση επί του πλοίου και στο ναυπηγείο.",
  },
  {
    slug: "power-generation",
    image: "/manus-storage/ind_power_generation_72b75eed.jpg",
    titleEn: "Power Generation",
    titleEl: "Παραγωγή Ενέργειας",
    bodyEn:
      "Belzona's cold-curing polymeric coatings and repair composites have served the power industry for decades, protecting turbines, condensers, cooling systems and structural steelwork.",
    bodyEl:
      "Οι πολυμερείς επιστρώσεις ψυχρής ωρίμανσης και τα σύνθετα επισκευής της Belzona εξυπηρετούν τον κλάδο ενέργειας για δεκαετίες, προστατεύοντας στροβίλους, συμπυκνωτές, συστήματα ψύξης και δομικό χάλυβα.",
  },
  {
    slug: "petrochemical",
    image: "/manus-storage/ind_petrochemical_06d891fd.jpg",
    titleEn: "Petrochemical",
    titleEl: "Πετροχημικά",
    bodyEn:
      "Repair and protect equipment exposed to aggressive chemicals, heat and pressure. Belzona linings and coatings resist chemical attack and restore process equipment to full service.",
    bodyEl:
      "Επισκευάστε και προστατεύστε εξοπλισμό εκτεθειμένο σε επιθετικά χημικά, θερμότητα και πίεση. Οι επενδύσεις και επιστρώσεις Belzona αντιστέκονται στη χημική προσβολή και αποκαθιστούν τον εξοπλισμό διεργασιών σε πλήρη λειτουργία.",
  },
  {
    slug: "buildings-structures",
    image: "/manus-storage/ind_buildings_1ee73565.jpg",
    titleEn: "Buildings & Structures",
    titleEl: "Κτίρια & Κατασκευές",
    bodyEn:
      "From concrete repair and waterproofing to roof and floor protection, Belzona delivers durable facilities maintenance solutions for industrial and commercial buildings.",
    bodyEl:
      "Από επισκευή σκυροδέματος και στεγανοποίηση έως προστασία στεγών και δαπέδων, η Belzona προσφέρει ανθεκτικές λύσεις συντήρησης εγκαταστάσεων για βιομηχανικά και εμπορικά κτίρια.",
  },
];

// Seed applications used when the database has no admin-managed entries yet.
export type SeedApplication = {
  titleEn: string;
  titleEl: string;
  summaryEn: string;
  summaryEl: string;
  image: string;
};

export const SEED_APPLICATIONS: SeedApplication[] = [
  {
    titleEn: "Pump Restoration & Efficiency",
    titleEl: "Αποκατάσταση & Απόδοση Αντλιών",
    summaryEn: "Rebuild worn pump casings and impellers to original profile with improved efficiency and reduced downtime.",
    summaryEl: "Αποκαταστήστε φθαρμένα κελύφη και πτερωτές αντλιών στο αρχικό προφίλ με βελτιωμένη απόδοση και μειωμένο χρόνο διακοπής.",
    image: "/manus-storage/app_pump_restoration_47e4de92.jpg",
  },
  {
    titleEn: "Pipe & Tank Repair",
    titleEl: "Επισκευή Σωλήνων & Δεξαμενών",
    summaryEn: "Seal leaks and rebuild corroded pipework and tanks in-situ using Belzona composites and SuperWrap systems.",
    summaryEl: "Σφραγίστε διαρροές και αποκαταστήστε διαβρωμένες σωληνώσεις και δεξαμενές επιτόπου με σύνθετα Belzona και συστήματα SuperWrap.",
    image: "/manus-storage/app_pipe_repair_4bb16214.jpg",
  },
  {
    titleEn: "Tank & Vessel Lining",
    titleEl: "Επένδυση Δεξαμενών & Δοχείων",
    summaryEn: "Internally line storage tanks and vessels to protect against erosion, corrosion and chemical attack.",
    summaryEl: "Επενδύστε εσωτερικά δεξαμενές αποθήκευσης και δοχεία για προστασία από διάβρωση, οξείδωση και χημική προσβολή.",
    image: "/manus-storage/app_tank_lining_6d7c1255.jpg",
  },
  {
    titleEn: "Corrosion Protection",
    titleEl: "Προστασία από Διάβρωση",
    summaryEn: "Long-term protective coatings for steelwork, flanges and structures exposed to harsh industrial and marine environments.",
    summaryEl: "Μακροχρόνιες προστατευτικές επιστρώσεις για χάλυβα, φλάντζες και κατασκευές εκτεθειμένες σε σκληρά βιομηχανικά και θαλάσσια περιβάλλοντα.",
    image: "/manus-storage/app_corrosion_protection_05bd5294.jpg",
  },
];
