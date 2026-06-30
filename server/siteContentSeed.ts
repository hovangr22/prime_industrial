import type { InsertSiteContent } from "../drizzle/schema";
import { seedSiteContent } from "./db";

/**
 * Definition of every owner-editable text field on the site.
 *
 * `contentKey` MUST match the i18n key used in the frontend dictionary so the
 * frontend can override the default copy with the DB value (falling back to the
 * dictionary when a field has never been edited).
 *
 * To make a new piece of copy editable: add an entry here with its default
 * EN/EL values, then read it on the page via the `useContent()` hook.
 */
export type SiteContentField = Omit<InsertSiteContent, "id" | "updatedAt"> & {
  contentKey: string;
  groupName: string;
  label: string;
  valueEn: string;
  valueEl: string;
  multiline: boolean;
  sortOrder: number;
};

export const SITE_CONTENT_FIELDS: SiteContentField[] = [
  // ---- Services page ----
  {
    contentKey: "services.title",
    groupName: "Services",
    label: "Services — Page Title",
    valueEn: "Our Services",
    valueEl: "Οι Υπηρεσίες μας",
    multiline: false,
    sortOrder: 10,
  },
  {
    contentKey: "services.subtitle",
    groupName: "Services",
    label: "Services — Subtitle",
    valueEn: "More than products — Prime Industrial delivers end-to-end support to keep your operations running.",
    valueEl: "Πέρα από προϊόντα — η Prime Industrial προσφέρει ολοκληρωμένη υποστήριξη για να διατηρεί τις λειτουργίες σας ενεργές.",
    multiline: true,
    sortOrder: 11,
  },
  {
    contentKey: "services.support.title",
    groupName: "Services",
    label: "Service 1 — Title (24/7 Support)",
    valueEn: "24/7 Local Technical Support",
    valueEl: "24/7 Τοπική Τεχνική Υποστήριξη",
    multiline: false,
    sortOrder: 12,
  },
  {
    contentKey: "services.support.body",
    groupName: "Services",
    label: "Service 1 — Description",
    valueEn: "Round-the-clock guidance from Belzona-trained engineers serving Greece and Cyprus, available whenever a critical issue arises.",
    valueEl: "Ολοήμερη καθοδήγηση από μηχανικούς εκπαιδευμένους στη Belzona που εξυπηρετούν Ελλάδα και Κύπρο, διαθέσιμη όποτε προκύψει κρίσιμο ζήτημα.",
    multiline: true,
    sortOrder: 13,
  },
  {
    contentKey: "services.onsite.title",
    groupName: "Services",
    label: "Service 2 — Title (On-Site)",
    valueEn: "On-Site Assistance",
    valueEl: "Επιτόπια Συνδρομή",
    multiline: false,
    sortOrder: 14,
  },
  {
    contentKey: "services.onsite.body",
    groupName: "Services",
    label: "Service 2 — Description",
    valueEn: "Our specialists attend your facility or vessel to assess damage, recommend solutions and supervise application.",
    valueEl: "Οι ειδικοί μας επισκέπτονται την εγκατάστασή σας ή το πλοίο για να αξιολογήσουν τη ζημιά, να προτείνουν λύσεις και να επιβλέψουν την εφαρμογή.",
    multiline: true,
    sortOrder: 15,
  },
  {
    contentKey: "services.consultancy.title",
    groupName: "Services",
    label: "Service 3 — Title (Consultancy)",
    valueEn: "Engineering Consultancy",
    valueEl: "Συμβουλευτική Μηχανικού",
    multiline: false,
    sortOrder: 16,
  },
  {
    contentKey: "services.consultancy.body",
    groupName: "Services",
    label: "Service 3 — Description",
    valueEn: "From material selection to long-term asset protection strategy, we advise on the most cost-effective approach.",
    valueEl: "Από την επιλογή υλικού έως τη στρατηγική μακροχρόνιας προστασίας, σας συμβουλεύουμε για την πιο οικονομικά αποδοτική προσέγγιση.",
    multiline: true,
    sortOrder: 17,
  },

  // ---- Home page ----
  {
    contentKey: "home.value.exclusive.title",
    groupName: "Home",
    label: "Value 1 — Title (Exclusive Distributor)",
    valueEn: "Exclusive Belzona Distributor",
    valueEl: "Αποκλειστικός Διανομέας Belzona",
    multiline: false,
    sortOrder: 20,
  },
  {
    contentKey: "home.value.exclusive.body",
    groupName: "Home",
    label: "Value 1 — Description",
    valueEn: "Prime Industrial is the sole authorised distributor of Belzona products in Greece and Cyprus, ensuring genuine materials and full manufacturer support.",
    valueEl: "Η Prime Industrial είναι ο μοναδικός εξουσιοδοτημένος διανομέας προϊόντων Belzona σε Ελλάδα και Κύπρο, εξασφαλίζοντας γνήσια υλικά και πλήρη υποστήριξη κατασκευαστή.",
    multiline: true,
    sortOrder: 21,
  },
  {
    contentKey: "home.value.support.title",
    groupName: "Home",
    label: "Value 2 — Title (24-Hour Support)",
    valueEn: "24-Hour Local Support",
    valueEl: "24ωρη Τοπική Υποστήριξη",
    multiline: false,
    sortOrder: 22,
  },
  {
    contentKey: "home.value.support.body",
    groupName: "Home",
    label: "Value 2 — Description",
    valueEn: "Our engineers provide rapid on-site assistance and consultancy, minimising downtime across industry and maritime operations.",
    valueEl: "Οι μηχανικοί μας παρέχουν άμεση επιτόπια συνδρομή και συμβουλευτική, ελαχιστοποιώντας τον χρόνο διακοπής σε βιομηχανία και ναυτιλία.",
    multiline: true,
    sortOrder: 23,
  },
  {
    contentKey: "home.value.solutions.title",
    groupName: "Home",
    label: "Value 3 — Title (Proven Solutions)",
    valueEn: "Proven Solutions",
    valueEl: "Δοκιμασμένες Λύσεις",
    multiline: false,
    sortOrder: 24,
  },
  {
    contentKey: "home.value.solutions.body",
    groupName: "Home",
    label: "Value 3 — Description",
    valueEn: "Cold-applied repair composites and coatings solve erosion, corrosion, chemical attack and abrasion without hot work.",
    valueEl: "Σύνθετα υλικά επισκευής και επιστρώσεις ψυχρής εφαρμογής αντιμετωπίζουν διάβρωση, οξείδωση, χημική προσβολή και τριβή χωρίς θερμές εργασίες.",
    multiline: true,
    sortOrder: 25,
  },
  {
    contentKey: "home.cta.title",
    groupName: "Home",
    label: "Call-to-Action — Title",
    valueEn: "Ready to solve your maintenance challenge?",
    valueEl: "Έτοιμοι να λύσετε το πρόβλημα συντήρησής σας;",
    multiline: false,
    sortOrder: 26,
  },
  {
    contentKey: "home.cta.body",
    groupName: "Home",
    label: "Call-to-Action — Description",
    valueEn: "Talk to our team about the right Belzona solution for your equipment and structures.",
    valueEl: "Μιλήστε με την ομάδα μας για τη σωστή λύση Belzona για τον εξοπλισμό και τις κατασκευές σας.",
    multiline: true,
    sortOrder: 27,
  },

  // ---- About page ----
  {
    contentKey: "about.lead",
    groupName: "About",
    label: "About — Lead Paragraph",
    valueEn: "Prime Industrial is the Exclusive Authorised Distributor of Belzona products for Greece and Cyprus, serving industry and maritime clients with proven repair and protection solutions.",
    valueEl: "Η Prime Industrial είναι ο Αποκλειστικός Εξουσιοδοτημένος Διανομέας προϊόντων Belzona για Ελλάδα και Κύπρο, εξυπηρετώντας πελάτες βιομηχανίας και ναυτιλίας με δοκιμασμένες λύσεις επισκευής και προστασίας.",
    multiline: true,
    sortOrder: 30,
  },
  {
    contentKey: "about.story.body",
    groupName: "About",
    label: "About — Who We Are",
    valueEn: "Based in Piraeus, the heart of Greek shipping, Prime Industrial brings Belzona's globally trusted polymer technology to local industry and maritime operators. We combine genuine Belzona materials with hands-on engineering experience to repair, protect and improve equipment and structures — reducing downtime, extending asset life and cutting replacement costs.",
    valueEl: "Με έδρα τον Πειραιά, την καρδιά της ελληνικής ναυτιλίας, η Prime Industrial φέρνει την παγκοσμίως αξιόπιστη τεχνολογία πολυμερών της Belzona στην τοπική βιομηχανία και τους ναυτιλιακούς φορείς. Συνδυάζουμε γνήσια υλικά Belzona με πρακτική εμπειρία μηχανικού για την επισκευή, προστασία και βελτίωση εξοπλισμού και κατασκευών — μειώνοντας τον χρόνο διακοπής, επεκτείνοντας τη διάρκεια ζωής και περιορίζοντας το κόστος αντικατάστασης.",
    multiline: true,
    sortOrder: 31,
  },
  {
    contentKey: "about.partnership.body",
    groupName: "About",
    label: "About — Belzona Partnership",
    valueEn: "As the official and exclusive Belzona distributor for Greece and Cyprus, we have direct access to Belzona's manufacturing know-how, technical resources and continuous product innovation. Every solution we deliver carries the full backing of Belzona International.",
    valueEl: "Ως ο επίσημος και αποκλειστικός διανομέας Belzona για Ελλάδα και Κύπρο, έχουμε άμεση πρόσβαση στην τεχνογνωσία παραγωγής, τους τεχνικούς πόρους και τη συνεχή καινοτομία προϊόντων της Belzona. Κάθε λύση που παρέχουμε φέρει την πλήρη υποστήριξη της Belzona International.",
    multiline: true,
    sortOrder: 32,
  },
];

let _seeded = false;

/**
 * Ensure all defined editable fields exist in the database.
 * Runs once per server process; safe to call repeatedly.
 * Never overwrites values the owner has already edited (see seedSiteContent).
 */
export async function ensureSiteContentSeeded(): Promise<void> {
  if (_seeded) return;
  try {
    for (const field of SITE_CONTENT_FIELDS) {
      await seedSiteContent(field);
    }
    _seeded = true;
  } catch (err) {
    // If seeding fails (e.g. DB momentarily unavailable), allow a later retry.
    console.warn("[siteContent] seeding failed, will retry:", err);
  }
}
