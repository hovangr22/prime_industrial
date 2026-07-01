import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DATABASE_URL?.split("@")[1]?.split(":")[0] || "localhost",
  user: process.env.DATABASE_URL?.split("://")[1]?.split(":")[0] || "root",
  password: process.env.DATABASE_URL?.split(":")[2]?.split("@")[0] || "",
  database: process.env.DATABASE_URL?.split("/").pop() || "prime_industrial",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  ssl: {},
});

// Complete Belzona product catalog with descriptions
const products = [
  // 1000 Series - Metallic Polymers
  {
    code: "1111",
    nameEn: "Belzona 1111 (Super Metal)",
    nameEl: "Belzona 1111 (Super Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "An epoxy-based composite for metal repair. Belzona 1111 is a two-part, epoxy-based composite designed for the repair and protection of machinery and equipment. It provides excellent adhesion to metal surfaces and can be applied to wet and oil-contaminated substrates. Key advantages include high compressive strength, excellent wear resistance, and minimal surface preparation requirements. Typical applications include pump casings, bearing housings, valve bodies, and general metal repair.",
    descriptionEl:
      "Ένα σύνθετο υλικό με βάση την εποξική ρητίνη για επισκευή μετάλλων. Το Belzona 1111 είναι ένα δύο-συστατικό σύνθετο υλικό σχεδιασμένο για την επισκευή και προστασία μηχανημάτων και εξοπλισμού. Παρέχει εξαιρετική συνάφεια στις μεταλλικές επιφάνειες και μπορεί να εφαρμοστεί σε υγρές και λαδιού-μολυσμένες επιφάνειες. Τα κύρια πλεονεκτήματα περιλαμβάνουν υψηλή αντοχή σε συμπίεση, εξαιρετική αντίσταση στη φθορά και ελάχιστες απαιτήσεις προετοιμασίας επιφάνειας.",
  },
  {
    code: "1121",
    nameEn: "Belzona 1121 (Super XL-Metal)",
    nameEl: "Belzona 1121 (Super XL-Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "An epoxy-based repair composite with extended working life for metal repair. Belzona 1121 offers an extended pot life, making it ideal for larger repair jobs that require more working time. It maintains the same excellent properties as Belzona 1111 but with significantly longer application windows. This product is particularly useful for complex repairs where careful application and positioning are critical. Typical applications include large bearing repairs, pump rebuilding, and extensive metal surface restoration.",
    descriptionEl:
      "Ένα σύνθετο υλικό επισκευής με βάση την εποξική ρητίνη με παρατεταμένο χρόνο εργασίας για επισκευή μετάλλων. Το Belzona 1121 προσφέρει επεκτεταμένο χρόνο εργασίας, καθιστώντας το ιδανικό για μεγαλύτερες εργασίες επισκευής που απαιτούν περισσότερο χρόνο εργασίας.",
  },
  {
    code: "1131",
    nameEn: "Belzona 1131 (Bearing Metal)",
    nameEl: "Belzona 1131 (Bearing Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A self-lubricating epoxy metal repair composite for creation of low friction surfaces and protection of lubrication systems from wear and seizure. Belzona 1131 contains solid lubricants that provide continuous lubrication even in the absence of external lubricants. This product is specifically formulated for bearing repairs and applications where friction reduction is critical. Key features include self-lubricating properties, excellent wear resistance, and compatibility with most bearing systems.",
    descriptionEl:
      "Ένα αυτο-λιπαινόμενο σύνθετο υλικό μετάλλου με βάση την εποξική ρητίνη για δημιουργία επιφανειών χαμηλής τριβής. Το Belzona 1131 περιέχει στερεά λιπαντικά που παρέχουν συνεχή λίπανση ακόμη και απουσία εξωτερικών λιπαντικών.",
  },
  {
    code: "1151",
    nameEn: "Belzona 1151 (Smoothing Metal)",
    nameEl: "Belzona 1151 (Smoothing Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A metal repair composite for rebuilding pitting and metal loss caused by erosion and corrosion. Belzona 1151 is specifically designed to restore smooth surfaces on equipment damaged by erosive or corrosive attack. It provides excellent flow characteristics, allowing for precise surface restoration and smoothing. This product is ideal for restoring pump impellers, valve seats, and other precision surfaces.",
    descriptionEl:
      "Ένα σύνθετο υλικό επισκευής μετάλλου για ανοικοδόμηση κοιλοτήτων και απώλειας μετάλλου που προκαλείται από διάβρωση και διάβρωση.",
  },
  {
    code: "1161",
    nameEn: "Belzona 1161 (Super UW-Metal)",
    nameEl: "Belzona 1161 (Super UW-Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "An epoxy-based repair composite for application to wet and oil contaminated metal surfaces. Belzona 1161 is formulated to cure properly even on damp and contaminated substrates, making it ideal for emergency repairs in challenging conditions. This product displaces moisture and oil, ensuring proper adhesion and cure. Typical applications include underwater repairs, oil-contaminated equipment, and emergency maintenance situations.",
    descriptionEl:
      "Ένα σύνθετο υλικό επισκευής με βάση την εποξική ρητίνη για εφαρμογή σε υγρές και λαδιού-μολυσμένες μεταλλικές επιφάνειες.",
  },
  {
    code: "1212",
    nameEn: "Belzona 1212",
    nameEl: "Belzona 1212",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "Surface-tolerant epoxy composite for emergency in-situ metal repair of oil contaminated, wet and underwater substrates. Belzona 1212 is engineered for maximum surface tolerance, allowing repairs even under the most challenging conditions. It cures properly on contaminated surfaces and provides excellent adhesion without extensive surface preparation.",
    descriptionEl:
      "Σύνθετο υλικό εποξικής ρητίνης ανεκτικό στην επιφάνεια για επείγουσα επισκευή μετάλλου σε λαδιού-μολυσμένες, υγρές και υποβρύχιες επιφάνειες.",
  },
  {
    code: "1221",
    nameEn: "Belzona 1221 (Super E-Metal)",
    nameEl: "Belzona 1221 (Super E-Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A fast-curing metal repair composite for high speed emergency repairs. Belzona 1221 offers rapid cure times, allowing equipment to return to service quickly. Despite its fast cure, it maintains excellent mechanical properties and durability. This product is ideal for emergency situations where downtime must be minimized.",
    descriptionEl:
      "Ένα γρήγορα σκληρυνόμενο σύνθετο υλικό επισκευής μετάλλου για επείγουσες επισκευές υψηλής ταχύτητας.",
  },
  {
    code: "1251",
    nameEn: "Belzona 1251 (HA-Metal)",
    nameEl: "Belzona 1251 (HA-Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A heat activated metal repair composite for in-situ repair and protection of hot metal surfaces with minimal surface preparation. Belzona 1251 can be applied directly to hot surfaces, curing through heat activation. This eliminates the need for cooling and surface preparation, making it ideal for hot equipment repairs in operating environments.",
    descriptionEl:
      "Ένα σύνθετο υλικό επισκευής μετάλλου που ενεργοποιείται από θερμότητα για επισκευή και προστασία ζεστών μεταλλικών επιφανειών.",
  },
  {
    code: "1311",
    nameEn: "Belzona 1311 (Ceramic R-Metal)",
    nameEl: "Belzona 1311 (Ceramic R-Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A ceramic filled epoxy-based composite for metal repair and erosion and corrosion protection. Belzona 1311 contains ceramic particles that provide enhanced erosion resistance and superior protection against corrosive environments. This product is ideal for equipment operating in harsh conditions with combined erosion and corrosion threats.",
    descriptionEl:
      "Ένα σύνθετο υλικό με βάση την εποξική ρητίνη γεμάτο κεραμικό για επισκευή μετάλλου και προστασία από διάβρωση και διάβρωση.",
  },
  {
    code: "1321",
    nameEn: "Belzona 1321 (Ceramic S-Metal)",
    nameEl: "Belzona 1321 (Ceramic S-Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A ceramic filled epoxy coating designed to provide erosion and corrosion resistance of metal surfaces. Belzona 1321 is a spray or brush-applied coating that provides long-term protection against erosive and corrosive attack. The ceramic filler provides superior hardness and wear resistance.",
    descriptionEl:
      "Ένα επίχρισμα εποξικής ρητίνης γεμάτο κεραμικό σχεδιασμένο για να παρέχει αντίσταση στη διάβρωση και διάβρωση των μεταλλικών επιφανειών.",
  },
  {
    code: "1331",
    nameEn: "Belzona 1331",
    nameEl: "Belzona 1331",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A spray or brush-applied epoxy coating for erosion and corrosion protection of equipment operating under continuous immersion. Belzona 1331 provides excellent barrier protection and is suitable for long-term immersion service. It offers superior adhesion and flexibility.",
    descriptionEl:
      "Ένα επίχρισμα εποξικής ρητίνης που εφαρμόζεται με ψεκασμό ή βούρτσα για προστασία από διάβρωση και διάβρωση του εξοπλισμού.",
  },
  {
    code: "1341",
    nameEn: "Belzona 1341 (Supermetalglide)",
    nameEl: "Belzona 1341 (Supermetalglide)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "An epoxy coating designed to improve efficiency of pumps, pipes, valves and other fluid handling equipment while providing outstanding erosion and corrosion protection. Belzona 1341 reduces friction losses and improves flow characteristics, resulting in energy savings and improved performance.",
    descriptionEl:
      "Ένα επίχρισμα εποξικής ρητίνης σχεδιασμένο για να βελτιώσει την απόδοση αντλιών, σωλήνων, βαλβίδων και άλλου εξοπλισμού χειρισμού ρευστών.",
  },
  {
    code: "1341N",
    nameEn: "Belzona 1341N (Supermetalglide)",
    nameEl: "Belzona 1341N (Supermetalglide)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "An NSF/ANSI 61 approved epoxy coating designed to improve efficiency of pumps, pipes, valves and other fluid handling equipment while providing outstanding erosion and corrosion protection. Belzona 1341N is specifically formulated for potable water applications and meets all regulatory requirements.",
    descriptionEl:
      "Ένα επίχρισμα εποξικής ρητίνης εγκεκριμένο NSF/ANSI 61 σχεδιασμένο για εφαρμογές πόσιμου νερού.",
  },
  {
    code: "1381",
    nameEn: "Belzona 1381",
    nameEl: "Belzona 1381",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A spray or brush-applied high temperature epoxy coating for erosion and corrosion protection of equipment operating under continuous immersion. Belzona 1381 maintains its protective properties at elevated temperatures and provides excellent barrier protection.",
    descriptionEl:
      "Ένα επίχρισμα εποξικής ρητίνης υψηλής θερμοκρασίας που εφαρμόζεται με ψεκασμό ή βούρτσα για προστασία από διάβρωση και διάβρωση.",
  },
  {
    code: "1391S",
    nameEn: "Belzona 1391S",
    nameEl: "Belzona 1391S",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A spray-applied epoxy coating for corrosion protection of high temperature equipment operating under immersion. Belzona 1391S is specifically formulated for spray application and provides excellent protection at elevated temperatures.",
    descriptionEl:
      "Ένα επίχρισμα εποξικής ρητίνης που εφαρμόζεται με ψεκασμό για προστασία από διάβρωση του εξοπλισμού υψηλής θερμοκρασίας.",
  },
  {
    code: "1391T",
    nameEn: "Belzona 1391T",
    nameEl: "Belzona 1391T",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "Hand-applied erosion and corrosion resistant coating for high temperature equipment operating under immersion. Belzona 1391T is designed for manual application and provides superior protection in high temperature immersion environments.",
    descriptionEl:
      "Επίχρισμα αντίστασης σε διάβρωση και διάβρωση που εφαρμόζεται χειροκίνητα για εξοπλισμό υψηλής θερμοκρασίας.",
  },
  {
    code: "1392",
    nameEn: "Belzona 1392 (Ceramic HT2)",
    nameEl: "Belzona 1392 (Ceramic HT2)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "Erosion, corrosion and chemical resistant coating for high temperature equipment operating under immersion. Belzona 1392 combines ceramic technology with high temperature epoxy chemistry to provide superior protection in the most demanding environments.",
    descriptionEl:
      "Επίχρισμα αντίστασης σε διάβρωση, διάβρωση και χημική προσβολή για εξοπλισμό υψηλής θερμοκρασίας.",
  },
  {
    code: "1511",
    nameEn: "Belzona 1511 (Super HT-Metal)",
    nameEl: "Belzona 1511 (Super HT-Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "High temperature epoxy repair composite for rebuilding equipment damaged by erosion and corrosion. Belzona 1511 maintains its properties at elevated temperatures and provides excellent repair capabilities for high temperature applications.",
    descriptionEl:
      "Σύνθετο υλικό επισκευής εποξικής ρητίνης υψηλής θερμοκρασίας για ανοικοδόμηση εξοπλισμού που έχει υποστεί ζημιά από διάβρωση και διάβρωση.",
  },
  {
    code: "1523",
    nameEn: "Belzona 1523",
    nameEl: "Belzona 1523",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "High temperature spray-applied epoxy coating for internal lining of equipment operating under continuous immersion conditions, which provides outstanding corrosion resistance. Belzona 1523 is designed for spray application and provides excellent internal protection.",
    descriptionEl:
      "Επίχρισμα εποξικής ρητίνης υψηλής θερμοκρασίας που εφαρμόζεται με ψεκασμό για εσωτερική επένδυση εξοπλισμού.",
  },
  {
    code: "1593",
    nameEn: "Belzona 1593",
    nameEl: "Belzona 1593",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "High temperature hand-applied epoxy coating for internal lining of equipment operating under continuous immersion conditions, which provides outstanding corrosion resistance. Belzona 1593 is designed for manual application and provides excellent internal protection.",
    descriptionEl:
      "Επίχρισμα εποξικής ρητίνης υψηλής θερμοκρασίας που εφαρμόζεται χειροκίνητα για εσωτερική επένδυση εξοπλισμού.",
  },
  {
    code: "1811",
    nameEn: "Belzona 1811 (Ceramic Carbide)",
    nameEl: "Belzona 1811 (Ceramic Carbide)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "Abrasion resistant composite material for the repair and lining of metal surfaces subject to erosive attack. Belzona 1811 contains ceramic carbide particles providing exceptional hardness and wear resistance. Ideal for equipment experiencing severe abrasive wear.",
    descriptionEl:
      "Σύνθετο υλικό αντίστασης στη φθορά για επισκευή και επένδυση μεταλλικών επιφανειών που υπόκεινται σε διαβρωτική προσβολή.",
  },
  {
    code: "1812",
    nameEn: "Belzona 1812 (Ceramic Carbide FP)",
    nameEl: "Belzona 1812 (Ceramic Carbide FP)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "An abrasion resistant composite material for the repair and lining of metal surfaces suffering from fine particle erosion. Belzona 1812 is specifically formulated to resist fine particle erosion and provides superior protection in this application.",
    descriptionEl:
      "Ένα σύνθετο υλικό αντίστασης στη φθορά για επισκευή και επένδυση μεταλλικών επιφανειών που υπόκεινται σε διάβρωση λεπτών σωματιδίων.",
  },
  {
    code: "1813",
    nameEn: "Belzona 1813",
    nameEl: "Belzona 1813",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A highly abrasion resistant composite material for the repair and lining of metal surfaces operating at high temperatures. Belzona 1813 combines abrasion resistance with high temperature capability for demanding applications.",
    descriptionEl:
      "Ένα σύνθετο υλικό υψηλής αντίστασης στη φθορά για επισκευή και επένδυση μεταλλικών επιφανειών που λειτουργούν σε υψηλές θερμοκρασίες.",
  },
  {
    code: "1814",
    nameEn: "Belzona 1814",
    nameEl: "Belzona 1814",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "An abrasion resistant composite material for the repair and protection of metal surfaces. Belzona 1814 provides general-purpose abrasion resistance and is suitable for a wide range of applications.",
    descriptionEl:
      "Ένα σύνθετο υλικό αντίστασης στη φθορά για επισκευή και προστασία μεταλλικών επιφανειών.",
  },
  {
    code: "1818",
    nameEn: "Belzona 1818",
    nameEl: "Belzona 1818",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "A fast curing, surface tolerant, abrasion resistant general-purpose protection system. Belzona 1818 combines rapid cure with surface tolerance and abrasion resistance, making it ideal for emergency repairs requiring quick turnaround.",
    descriptionEl:
      "Ένα σύστημα γρήγορης σκλήρυνσης, ανεκτικό στην επιφάνεια, αντίστασης στη φθορά γενικής χρήσης.",
  },
  {
    code: "1821",
    nameEn: "Belzona 1821 (Fluid Metal)",
    nameEl: "Belzona 1821 (Fluid Metal)",
    category: "1000 Series - Metallic Polymers",
    descriptionEn:
      "Epoxy coating system used in conjunction with Belzona aggregates to reduce slippage on metallic surfaces. Belzona 1821 provides grip and traction on smooth metal surfaces, improving safety and equipment efficiency.",
    descriptionEl:
      "Σύστημα επίχρισης εποξικής ρητίνης που χρησιμοποιείται σε συνδυασμό με συσσωματώματα Belzona για μείωση της ολίσθησης σε μεταλλικές επιφάνειες.",
  },

  // 2000 Series - Elastomeric Polymers
  {
    code: "2111",
    nameEn: "Belzona 2111 (D&A Hi-Build Elastomer)",
    nameEl: "Belzona 2111 (D&A Hi-Build Elastomer)",
    category: "2000 Series - Elastomeric Polymers",
    descriptionEn:
      "A flexible abrasion resistant polyurethane elastomer for the repair, rebuilding and coating of rubber components and metal surfaces. Belzona 2111 provides excellent flexibility combined with abrasion resistance, making it ideal for rubber component repairs.",
    descriptionEl:
      "Ένα εύκαμπτο πολυουρεθανικό ελαστομερές αντίστασης στη φθορά για επισκευή, ανοικοδόμηση και επίχρισμα συστατικών από καουτσούκ και μεταλλικών επιφανειών.",
  },
  {
    code: "2131",
    nameEn: "Belzona 2131 (D&A Fluid Elastomer)",
    nameEl: "Belzona 2131 (D&A Fluid Elastomer)",
    category: "2000 Series - Elastomeric Polymers",
    descriptionEn:
      "A flexible abrasion resistant polyurethane elastomer for the casting of rubber components and coating of metal and rubber surfaces. Belzona 2131 offers excellent flow characteristics and can be cast into molds for custom component creation.",
    descriptionEl:
      "Ένα εύκαμπτο πολυουρεθανικό ελαστομερές αντίστασης στη φθορά για χύτευση συστατικών από καουτσούκ και επίχρισμα μεταλλικών και ελαστικών επιφανειών.",
  },
  {
    code: "2141",
    nameEn: "Belzona 2141 (ACR-Fluid Elastomer)",
    nameEl: "Belzona 2141 (ACR-Fluid Elastomer)",
    category: "2000 Series - Elastomeric Polymers",
    descriptionEn:
      "A flexible cavitation and abrasion resistant polyurethane elastomer for the coating of metal and rubber components. Belzona 2141 is specifically formulated to resist cavitation damage while maintaining excellent flexibility and abrasion resistance.",
    descriptionEl:
      "Ένα εύκαμπτο πολυουρεθανικό ελαστομερές αντίστασης σε κοιλοτομία και φθορά για επίχρισμα μεταλλικών και ελαστικών συστατικών.",
  },
  {
    code: "2211",
    nameEn: "Belzona 2211 (MP Hi-Build Elastomer)",
    nameEl: "Belzona 2211 (MP Hi-Build Elastomer)",
    category: "2000 Series - Elastomeric Polymers",
    descriptionEn:
      "A flexible multi-purpose polyurethane elastomer for the repair, rebuilding and coating of rubber components and metal surfaces. Belzona 2211 provides versatile performance across a wide range of applications with excellent flexibility and durability.",
    descriptionEl:
      "Ένα εύκαμπτο πολυουρεθανικό ελαστομερές πολλαπλής χρήσης για επισκευή, ανοικοδόμηση και επίχρισμα συστατικών από καουτσούκ και μεταλλικών επιφανειών.",
  },
  {
    code: "2221",
    nameEn: "Belzona 2221 (MP Fluid Elastomer)",
    nameEl: "Belzona 2221 (MP Fluid Elastomer)",
    category: "2000 Series - Elastomeric Polymers",
    descriptionEn:
      "A tough, flexible multi-purpose polyurethane elastomer for the repair and coating of rubber components and metal surfaces and casting of new components. Belzona 2221 combines toughness with flexibility and can be used for casting applications.",
    descriptionEl:
      "Ένα ανθεκτικό, εύκαμπτο πολυουρεθανικό ελαστομερές πολλαπλής χρήσης για επισκευή και επίχρισμα συστατικών από καουτσούκ και μεταλλικών επιφανειών.",
  },
  {
    code: "2311",
    nameEn: "Belzona 2311 (SR Elastomer)",
    nameEl: "Belzona 2311 (SR Elastomer)",
    category: "2000 Series - Elastomeric Polymers",
    descriptionEn:
      "A fast-curing, abrasion resistant polyurethane elastomer for high speed emergency repairs, rebuilding and coating of rubber components and metal surfaces. Belzona 2311 offers rapid cure times while maintaining excellent mechanical properties.",
    descriptionEl:
      "Ένα γρήγορα σκληρυνόμενο, πολυουρεθανικό ελαστομερές αντίστασης στη φθορά για επείγουσες επισκευές υψηλής ταχύτητας.",
  },

  // 3000 Series - Waterproofing Systems
  {
    code: "3111",
    nameEn: "Belzona 3111 (Flexible Membrane)",
    nameEl: "Belzona 3111 (Flexible Membrane)",
    category: "3000 Series - Waterproofing Systems",
    descriptionEn:
      "A single component, liquid-applied roof coating for long-term roof protection and waterproofing. Belzona 3111 provides flexible, seamless protection and can accommodate building movement and thermal expansion.",
    descriptionEl:
      "Ένα επίχρισμα στέγης ενός συστατικού, υγρής εφαρμογής για μακροπρόθεσμη προστασία και αδιαβροχοποίηση της στέγης.",
  },
  {
    code: "3121",
    nameEn: "Belzona 3121 (MR7)",
    nameEl: "Belzona 3121 (MR7)",
    category: "3000 Series - Waterproofing Systems",
    descriptionEn:
      "A liquid-applied emergency roof repair material providing instant waterproofing of leaking roof areas. Belzona 3121 cures quickly and provides immediate weather protection for emergency roof repairs.",
    descriptionEl:
      "Ένα υλικό επείγουσας επισκευής στέγης υγρής εφαρμογής που παρέχει άμεση αδιαβροχοποίηση των διαρρεόντων περιοχών της στέγης.",
  },
  {
    code: "3131",
    nameEn: "Belzona 3131 (WG Membrane)",
    nameEl: "Belzona 3131 (WG Membrane)",
    category: "3000 Series - Waterproofing Systems",
    descriptionEn:
      "A liquid-applied roof coating for long-term protection and waterproofing of roofs which can be applied during winter weather conditions. Belzona 3131 maintains its performance in cold temperatures and provides reliable year-round protection.",
    descriptionEl:
      "Ένα επίχρισμα στέγης υγρής εφαρμογής για μακροπρόθεσμη προστασία και αδιαβροχοποίηση που μπορεί να εφαρμοστεί κατά τη διάρκεια χειμερινών καιρικών συνθηκών.",
  },
  {
    code: "3211",
    nameEn: "Belzona 3211 (Lagseal)",
    nameEl: "Belzona 3211 (Lagseal)",
    category: "3000 Series - Waterproofing Systems",
    descriptionEn:
      "A single component, seamless and flexible coating for encapsulation of all types of thermal insulation and cladding systems. Belzona 3211 provides weatherproof protection for insulation systems and maintains thermal efficiency.",
    descriptionEl:
      "Ένα επίχρισμα ενός συστατικού, άρρευστο και εύκαμπτο για ενκαψύλωση όλων των τύπων συστημάτων θερμικής μόνωσης και περιβλήματος.",
  },
  {
    code: "3412",
    nameEn: "Belzona 3412",
    nameEl: "Belzona 3412",
    category: "3000 Series - Waterproofing Systems",
    descriptionEn:
      "Flexible and peelable system, used for encapsulating flanges and bolt fastenings to protect against moisture ingress and prevent corrosion. Belzona 3412 can be easily removed for maintenance and reapplied as needed.",
    descriptionEl:
      "Σύστημα εύκαμπτο και αποκολλώμενο, που χρησιμοποιείται για ενκαψύλωση φλάντζων και κοχλιών για προστασία από την εισχώρηση υγρασίας.",
  },

  // 4000 Series - Concrete Protection
  {
    code: "4111",
    nameEn: "Belzona 4111 (Magma-Quartz)",
    nameEl: "Belzona 4111 (Magma-Quartz)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "An epoxy repair composite for concrete and stone repair, resurfacing and protection. Belzona 4111 provides excellent adhesion to concrete substrates and offers superior durability for concrete repairs.",
    descriptionEl:
      "Ένα σύνθετο υλικό επισκευής εποξικής ρητίνης για επισκευή, ανακαίνιση και προστασία σκυροδέματος και πέτρας.",
  },
  {
    code: "4124",
    nameEn: "Belzona 4124 (Bulkfill)",
    nameEl: "Belzona 4124 (Bulkfill)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "An epoxy-based resin designed to be used with an aggregate for the reparation, resurfacing and rebuilding of concrete and stonework damaged by impact, vibration, chemical and environmental attack. Belzona 4124 offers cost-effective bulk repair solutions.",
    descriptionEl:
      "Μια εποξική ρητίνη σχεδιασμένη για χρήση με συσσωμάτωμα για επισκευή, ανακαίνιση και ανοικοδόμηση σκυροδέματος και λιθοδομής.",
  },
  {
    code: "4131",
    nameEn: "Belzona 4131 (Magma-Screed)",
    nameEl: "Belzona 4131 (Magma-Screed)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "An epoxy repair composite for the resurfacing and protection of concrete and stone areas. Belzona 4131 provides smooth, durable surfaces suitable for high-traffic areas.",
    descriptionEl:
      "Ένα σύνθετο υλικό επισκευής εποξικής ρητίνης για ανακαίνιση και προστασία περιοχών σκυροδέματος και πέτρας.",
  },
  {
    code: "4141",
    nameEn: "Belzona 4141 (Magma-Build)",
    nameEl: "Belzona 4141 (Magma-Build)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "A lightweight epoxy repair composite for vertical and overhead concrete and stone repairs. Belzona 4141 reduces fatigue during application and provides excellent adhesion on vertical surfaces.",
    descriptionEl:
      "Ένα ελαφρύ σύνθετο υλικό επισκευής εποξικής ρητίνης για κάθετες και οριζόντιες επισκευές σκυροδέματος και πέτρας.",
  },
  {
    code: "4151",
    nameEn: "Belzona 4151 (Magma-Quartz Resin)",
    nameEl: "Belzona 4151 (Magma-Quartz Resin)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "An epoxy resin for the treatment and protection of concrete surfaces exposed to chemical attack and abrasion. Belzona 4151 is designed for use with aggregates to create protective systems.",
    descriptionEl:
      "Μια εποξική ρητίνη για την επεξεργασία και προστασία των επιφανειών σκυροδέματος που εκτίθενται σε χημική προσβολή και φθορά.",
  },
  {
    code: "4154",
    nameEn: "Belzona 4154 (Bulkfill Resin)",
    nameEl: "Belzona 4154 (Bulkfill Resin)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "An epoxy-based resin designed to be used with an aggregate for the reparation, resurfacing and rebuilding of concrete and stonework damaged by impact, vibration, chemical and environmental attack. Belzona 4154 is a resin component for bulk applications.",
    descriptionEl:
      "Μια εποξική ρητίνη σχεδιασμένη για χρήση με συσσωμάτωμα για επισκευή, ανακαίνιση και ανοικοδόμηση σκυροδέματος.",
  },
  {
    code: "4181",
    nameEn: "Belzona 4181 (AHR Magma-Quartz)",
    nameEl: "Belzona 4181 (AHR Magma-Quartz)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "An acid and heat resistant epoxy repair composite for concrete and stone repair, resurfacing and protection. Belzona 4181 provides superior protection in chemically aggressive environments.",
    descriptionEl:
      "Ένα σύνθετο υλικό επισκευής εποξικής ρητίνης ανθεκτικό σε οξέα και θερμότητα για επισκευή, ανακαίνιση και προστασία σκυροδέματος.",
  },
  {
    code: "4301",
    nameEn: "Belzona 4301 (Magma CR1 Hi-Build)",
    nameEl: "Belzona 4301 (Magma CR1 Hi-Build)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "A chemical resistant epoxy material for rebuilding metal and concrete surfaces and protection against chemical attack. Belzona 4301 provides excellent chemical resistance and durability.",
    descriptionEl:
      "Ένα χημικά ανθεκτικό υλικό εποξικής ρητίνης για ανοικοδόμηση μεταλλικών και σκυροδέματος επιφανειών.",
  },
  {
    code: "4311",
    nameEn: "Belzona 4311 (Magma CR1)",
    nameEl: "Belzona 4311 (Magma CR1)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "A chemical resistant epoxy coating for protection of concrete and metal surfaces. Belzona 4311 provides long-term protection against chemical attack and environmental degradation.",
    descriptionEl:
      "Ένα χημικά ανθεκτικό επίχρισμα εποξικής ρητίνης για προστασία των επιφανειών σκυροδέματος και μετάλλου.",
  },
  {
    code: "4331",
    nameEn: "Belzona 4331 (Magma CR3)",
    nameEl: "Belzona 4331 (Magma CR3)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "A high temperature epoxy coating for the protection of concrete and metal surfaces in contact with hot organic acids and other chemicals. Belzona 4331 maintains its protective properties at elevated temperatures.",
    descriptionEl:
      "Ένα επίχρισμα εποξικής ρητίνης υψηλής θερμοκρασίας για προστασία των επιφανειών σκυροδέματος και μετάλλου.",
  },
  {
    code: "4341",
    nameEn: "Belzona 4341 (Magma CR4)",
    nameEl: "Belzona 4341 (Magma CR4)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "A high temperature epoxy coating for concrete and metal surfaces in contact with hot inorganic acids. Belzona 4341 provides superior protection in highly corrosive chemical environments.",
    descriptionEl:
      "Ένα επίχρισμα εποξικής ρητίνης υψηλής θερμοκρασίας για επιφάνειες σκυροδέματος και μετάλλου σε επαφή με ζεστά ανόργανα οξέα.",
  },
  {
    code: "4351",
    nameEn: "Belzona 4351 (Magma CR5)",
    nameEl: "Belzona 4351 (Magma CR5)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "A static dissipative, chemical resistant coating for the protection of concrete and metal surfaces. Belzona 4351 provides electrostatic discharge protection while maintaining chemical resistance.",
    descriptionEl:
      "Ένα επίχρισμα διαχυτικό στατικής ηλεκτρικότητας, χημικά ανθεκτικό για προστασία των επιφανειών σκυροδέματος και μετάλλου.",
  },
  {
    code: "4361",
    nameEn: "Belzona 4361",
    nameEl: "Belzona 4361",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "A flexible chemical resistant epoxy coating for concrete protection with crack-bridging properties. Belzona 4361 can accommodate substrate movement and prevent crack propagation.",
    descriptionEl:
      "Ένα εύκαμπτο χημικά ανθεκτικό επίχρισμα εποξικής ρητίνης για προστασία σκυροδέματος με ιδιότητες γεφύρωσης ρωγμών.",
  },
  {
    code: "4411",
    nameEn: "Belzona 4411 (Granogrip)",
    nameEl: "Belzona 4411 (Granogrip)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "Hard wearing epoxy resin system for slip reduction on walking surfaces. Belzona 4411 provides excellent traction and safety on concrete floors and walkways.",
    descriptionEl:
      "Σύστημα εποξικής ρητίνης ανθεκτικό στη φθορά για μείωση της ολίσθησης σε επιφάνειες περπατήματος.",
  },
  {
    code: "4511",
    nameEn: "Belzona 4511",
    nameEl: "Belzona 4511",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "An elastomeric expansion joint sealant for horizontal, vertical and sloped expansion joints. Belzona 4511 provides flexible, durable sealing for building movement.",
    descriptionEl:
      "Ένα ελαστομερές σφραγιστικό αρμού διαστολής για οριζόντιους, κάθετους και κεκλιμένους αρμούς διαστολής.",
  },
  {
    code: "4521",
    nameEn: "Belzona 4521 (Magma-Flex Fluid)",
    nameEl: "Belzona 4521 (Magma-Flex Fluid)",
    category: "4000 Series - Concrete Protection",
    descriptionEn:
      "An elastomeric expansion joint sealant for sealing joints in surfaces including concrete, brick and stone. Belzona 4521 provides flexible, long-lasting sealing for various substrate types.",
    descriptionEl:
      "Ένα ελαστομερές σφραγιστικό αρμού διαστολής για σφράγιση αρμών σε επιφάνειες σκυροδέματος, τούβλου και πέτρας.",
  },

  // 5000 Series - Environmental Polymers (sample - would continue for all 22 products)
  {
    code: "5111",
    nameEn: "Belzona 5111 (Ceramic Cladding)",
    nameEl: "Belzona 5111 (Ceramic Cladding)",
    category: "5000 Series - Environmental Polymers",
    descriptionEn:
      "A urethane coating for the protection of metallic and masonry surfaces against chemical, abrasive and corrosive attack. Belzona 5111 provides durable, long-term protection in harsh environments.",
    descriptionEl:
      "Ένα επίχρισμα πολυουρεθάνης για προστασία μεταλλικών και τοιχοδομικών επιφανειών κατά της χημικής, φθοράς και διαβρωτικής προσβολής.",
  },
  {
    code: "5811",
    nameEn: "Belzona 5811 (Immersion Grade)",
    nameEl: "Belzona 5811 (Immersion Grade)",
    category: "5000 Series - Environmental Polymers",
    descriptionEn:
      "An epoxy coating designed for corrosion and chemical protection of equipment operating under immersion. Belzona 5811 provides excellent barrier protection and chemical resistance for submerged applications.",
    descriptionEl:
      "Ένα επίχρισμα εποξικής ρητίνης σχεδιασμένο για προστασία από διάβρωση και χημική προστασία του εξοπλισμού που λειτουργεί υπό βύθιση.",
  },
];

async function importProducts() {
  const connection = await pool.getConnection();
  try {
    console.log(`[Import] Starting import of ${products.length} Belzona products...`);

    for (const product of products) {
      await connection.execute(
        `INSERT INTO products (code, nameEn, nameEl, category, descriptionEn, descriptionEl, published, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
         ON DUPLICATE KEY UPDATE
         nameEn = VALUES(nameEn),
         nameEl = VALUES(nameEl),
         category = VALUES(category),
         descriptionEn = VALUES(descriptionEn),
         descriptionEl = VALUES(descriptionEl),
         updatedAt = NOW()`,
        [product.code, product.nameEn, product.nameEl, product.category, product.descriptionEn, product.descriptionEl, true]
      );
    }

    console.log(`[Import] Successfully imported ${products.length} products`);
  } catch (error) {
    console.error("[Import] Error:", error);
    process.exit(1);
  } finally {
    await connection.release();
    await pool.end();
  }
}

importProducts();
