import mysql from "mysql2/promise";

// Full bilingual descriptions sourced from official Belzona product pages (belzona.com).
// Each entry keyed by product `code`.
const DATA = {
  "Belzona 1111": {
    en: `Belzona 1111 (Super Metal) is a 2-part repair composite for metal repair and resurfacing, based on a 100% solids epoxy resin reinforced with a silicon steel alloy. It will not corrode and resists a wide range of chemicals. It is easy to mix and apply without specialist tools, cures at room temperature with no hot work, and can be machined using conventional tools.

Key benefits:
• Multi-purpose, durable repair composite that is fully machinable with conventional tools
• Application and cure at room temperature — no hot work and reduced health & safety risks (100% solids)
• Simple mixing ratio with no shrinkage, expansion or distortion
• Excellent adhesion to metals including stainless steel, carbon steel, aluminium, brass and copper
• Outstanding corrosion resistance and excellent chemical and electrical insulation properties
• Suitable for contact with potable water (certified to NSF/ANSI Standard 61)

Typical applications:
• Repair of cracks and holes on engine and pump casings, pipes and tanks
• Resurfacing of pitted metal surfaces and repair of damaged shafts and hydraulic rams
• In-situ flange repair and high-strength structural metal bonding
• Creation of load-bearing shims and reforming of bearing housings`,
    el: `Το Belzona 1111 (Super Metal) είναι ένα διμερές σύνθετο υλικό επισκευής μετάλλων, βασισμένο σε εποξειδική ρητίνη 100% στερεών ενισχυμένη με κράμα χάλυβα-πυριτίου. Δεν διαβρώνεται, αντέχει σε ευρύ φάσμα χημικών, αναμειγνύεται και εφαρμόζεται εύκολα χωρίς ειδικά εργαλεία, ωριμάζει σε θερμοκρασία περιβάλλοντος χωρίς θερμές εργασίες και κατεργάζεται με συμβατικά εργαλεία.

Βασικά πλεονεκτήματα:
• Ανθεκτικό σύνθετο επισκευής πολλαπλών χρήσεων, πλήρως κατεργάσιμο με συμβατικά εργαλεία
• Εφαρμογή και ωρίμανση σε θερμοκρασία περιβάλλοντος — χωρίς θερμές εργασίες, με μειωμένους κινδύνους υγείας & ασφάλειας (100% στερεά)
• Απλή αναλογία ανάμειξης, χωρίς συρρίκνωση, διαστολή ή παραμόρφωση
• Άριστη πρόσφυση σε μέταλλα όπως ανοξείδωτος και ανθρακούχος χάλυβας, αλουμίνιο, ορείχαλκος και χαλκός
• Εξαιρετική αντοχή στη διάβρωση και άριστες χημικές & ηλεκτρομονωτικές ιδιότητες
• Κατάλληλο για επαφή με πόσιμο νερό (πιστοποίηση NSF/ANSI Standard 61)

Τυπικές εφαρμογές:
• Επισκευή ρωγμών και οπών σε κελύφη κινητήρων και αντλιών, σωλήνες και δεξαμενές
• Αποκατάσταση διαβρωμένων μεταλλικών επιφανειών και επισκευή φθαρμένων αξόνων και υδραυλικών εμβόλων
• Επιτόπια επισκευή φλαντζών και δομική συγκόλληση μετάλλων υψηλής αντοχής
• Δημιουργία αποστατών φορτίου και ανακατασκευή εδράνων`,
  },
  "Belzona 1311": {
    en: `Belzona 1311 (Ceramic R-Metal) is a 2-part ceramic-filled, epoxy-based repair composite designed for metal repair and protection against erosion and corrosion. This 100% solids material has excellent chemical resistance and bonds to all metals and most rigid surfaces. It is easy to mix and apply without specialist tools and cures at room temperature, eliminating the need for hot work. It is ideally overcoated with Belzona 1321 (Ceramic S-Metal) for long-lasting performance.

Key benefits:
• Long-term erosion and corrosion resistance
• Excellent bonding to almost any rigid surface — steel, aluminium, copper, brass, glass, wood and most plastics
• Excellent chemical resistance and electrical insulation
• 100% solids for reduced health & safety risks, with a simple mixing ratio
• Room-temperature cure with no shrinkage, expansion or distortion
• Marine classification approvals (ABS, Bureau Veritas, DNV, CCS)

Typical applications:
• Rebuilding and geometry reconstruction of centrifugal and positive displacement pumps damaged by erosion and corrosion
• Pit filling and resurfacing of heat exchangers, water boxes and tube sheets
• Repair of butterfly and gate valves, fans and kort nozzles affected by erosion, corrosion and cavitation
• Repair of pipe elbows damaged by impingement and high-strength structural metal bonding`,
    el: `Το Belzona 1311 (Ceramic R-Metal) είναι ένα διμερές σύνθετο επισκευής με βάση εποξειδική ρητίνη και κεραμικά πληρωτικά, σχεδιασμένο για επισκευή μετάλλων και προστασία από διάβρωση και φθορά. Το υλικό 100% στερεών έχει άριστη χημική αντοχή και προσφύεται σε όλα τα μέταλλα και τις περισσότερες σκληρές επιφάνειες. Αναμειγνύεται και εφαρμόζεται εύκολα χωρίς ειδικά εργαλεία και ωριμάζει σε θερμοκρασία περιβάλλοντος χωρίς θερμές εργασίες. Επικαλύπτεται ιδανικά με Belzona 1321 (Ceramic S-Metal) για μακροχρόνια απόδοση.

Βασικά πλεονεκτήματα:
• Μακροχρόνια αντοχή σε διάβρωση και φθορά
• Άριστη πρόσφυση σχεδόν σε κάθε σκληρή επιφάνεια — χάλυβα, αλουμίνιο, χαλκό, ορείχαλκο, γυαλί, ξύλο και τα περισσότερα πλαστικά
• Εξαιρετική χημική αντοχή και ηλεκτρική μόνωση
• 100% στερεά για μειωμένους κινδύνους υγείας & ασφάλειας, με απλή αναλογία ανάμειξης
• Ωρίμανση σε θερμοκρασία περιβάλλοντος χωρίς συρρίκνωση, διαστολή ή παραμόρφωση
• Ναυτιλιακές εγκρίσεις νηογνωμόνων (ABS, Bureau Veritas, DNV, CCS)

Τυπικές εφαρμογές:
• Ανακατασκευή και αποκατάσταση γεωμετρίας φυγοκεντρικών και ογκομετρικών αντλιών με φθορά από διάβρωση
• Πλήρωση οπών και αποκατάσταση εναλλακτών θερμότητας, υδροθαλάμων και σωληνωτών πλακών
• Επισκευή δικλείδων πεταλούδας/σύρτη, ανεμιστήρων και ακροφυσίων kort που έχουν υποστεί διάβρωση, φθορά και σπηλαίωση
• Επισκευή γωνιών σωλήνων από πρόσκρουση και δομική συγκόλληση μετάλλων υψηλής αντοχής`,
  },
  "Belzona 1321": {
    en: `Belzona 1321 (Ceramic S-Metal) is a 2-part ceramic-filled epoxy coating designed to provide erosion and corrosion resistance to metal surfaces. This 100% solids coating has outstanding chemical resistance and bonds to almost any rigid surface. Its high compressive strength also makes it suitable for creating shims. It is easy to mix and apply without specialist tools and cures at room temperature, eliminating hot work.

Key benefits:
• Long-term erosion and corrosion protection with a high compressive strength
• Excellent bonding to almost any rigid surface — steel, aluminium, copper, brass and GRP
• Excellent chemical resistance and a long working life
• 100% solids for reduced health & safety risks
• Room-temperature application and cure with no shrinkage, expansion or distortion
• Simple mixing ratio

Typical applications:
• Internal protective coating for centrifugal and positive displacement pumps
• Long-term erosion and corrosion resistance for heat exchangers, water boxes and tube sheets
• Protection of butterfly and gate valves, fans and kort nozzles from erosion, corrosion and cavitation
• Impingement protection of pipe elbows and creation of load-bearing shims`,
    el: `Το Belzona 1321 (Ceramic S-Metal) είναι μια διμερής εποξειδική επίστρωση με κεραμικά πληρωτικά, σχεδιασμένη για αντοχή των μεταλλικών επιφανειών σε διάβρωση και φθορά. Η επίστρωση 100% στερεών έχει εξαιρετική χημική αντοχή και προσφύεται σχεδόν σε κάθε σκληρή επιφάνεια. Λόγω της υψηλής θλιπτικής αντοχής μπορεί επίσης να χρησιμοποιηθεί για τη δημιουργία αποστατών. Αναμειγνύεται και εφαρμόζεται εύκολα χωρίς ειδικά εργαλεία και ωριμάζει σε θερμοκρασία περιβάλλοντος χωρίς θερμές εργασίες.

Βασικά πλεονεκτήματα:
• Μακροχρόνια προστασία από διάβρωση και φθορά, με υψηλή θλιπτική αντοχή
• Άριστη πρόσφυση σχεδόν σε κάθε σκληρή επιφάνεια — χάλυβα, αλουμίνιο, χαλκό, ορείχαλκο και πλαστικά ενισχυμένα με ίνες γυαλιού
• Εξαιρετική χημική αντοχή και μεγάλος χρόνος εργασίας
• 100% στερεά για μειωμένους κινδύνους υγείας & ασφάλειας
• Εφαρμογή και ωρίμανση σε θερμοκρασία περιβάλλοντος χωρίς συρρίκνωση, διαστολή ή παραμόρφωση
• Απλή αναλογία ανάμειξης

Τυπικές εφαρμογές:
• Εσωτερική προστατευτική επίστρωση φυγοκεντρικών και ογκομετρικών αντλιών
• Μακροχρόνια αντοχή σε διάβρωση/φθορά για εναλλάκτες θερμότητας, υδροθαλάμους και σωληνωτές πλάκες
• Προστασία δικλείδων, ανεμιστήρων και ακροφυσίων kort από διάβρωση, φθορά και σπηλαίωση
• Προστασία γωνιών σωλήνων από πρόσκρουση και δημιουργία αποστατών φορτίου`,
  },
  "Belzona 5811": {
    en: `Belzona 5811 (Immersion Grade) is a 2-part epoxy coating that provides outstanding chemical resistance and protects equipment operating under immersion in aqueous solutions up to 50°C (122°F) from corrosion. This 100% solids material can be applied by brush or spray to virtually any metallic and non-metallic surface, simplifying maintenance.

Key benefits:
• Effective protection of equipment operating under immersion from corrosion damage
• Easy application by brush or spray and cure at room temperature — no hot work
• Excellent chemical resistance against a wide range of chemicals, sea water and crude oil
• 100% solids for reduced health & safety risks
• Eliminates the need for replacement and reduces downtime
• Excellent adhesion to virtually any surface including cast iron, stainless steel, brass, copper, concrete, wood, fibreglass and aluminium

Typical applications:
• Coating for tanks, bunds, process vessels, pumps, pipes, heat exchangers and clarifiers operating under immersion
• Protection of tanks and secondary containment areas from chemical attack, erosion and corrosion
• Protection of pipework from erosion, corrosion and chemical attack
• High-strength structural adhesive for metal bonding`,
    el: `Το Belzona 5811 (Immersion Grade) είναι μια διμερής εποξειδική επίστρωση που προσφέρει εξαιρετική χημική αντοχή και προστατεύει από διάβρωση τον εξοπλισμό που λειτουργεί υπό εμβάπτιση σε υδατικά διαλύματα έως 50°C (122°F). Το υλικό 100% στερεών εφαρμόζεται με πινέλο ή ψεκασμό σχεδόν σε κάθε μεταλλική και μη μεταλλική επιφάνεια, απλοποιώντας τη συντήρηση.

Βασικά πλεονεκτήματα:
• Αποτελεσματική προστασία από διάβρωση εξοπλισμού που λειτουργεί υπό εμβάπτιση
• Εύκολη εφαρμογή με πινέλο ή ψεκασμό και ωρίμανση σε θερμοκρασία περιβάλλοντος — χωρίς θερμές εργασίες
• Εξαιρετική χημική αντοχή σε ευρύ φάσμα χημικών, θαλασσινό νερό και αργό πετρέλαιο
• 100% στερεά για μειωμένους κινδύνους υγείας & ασφάλειας
• Εξαλείφει την ανάγκη αντικατάστασης και μειώνει τον χρόνο ακινητοποίησης
• Άριστη πρόσφυση σχεδόν σε κάθε επιφάνεια: χυτοσίδηρο, ανοξείδωτο χάλυβα, ορείχαλκο, χαλκό, σκυρόδεμα, ξύλο, υαλόνημα και αλουμίνιο

Τυπικές εφαρμογές:
• Επίστρωση δεξαμενών, λεκανών συγκράτησης, δοχείων διεργασιών, αντλιών, σωλήνων, εναλλακτών και διαυγαστήρων υπό εμβάπτιση
• Προστασία δεξαμενών και χώρων δευτερεύουσας συγκράτησης από χημική προσβολή, διάβρωση και φθορά
• Προστασία σωληνώσεων από διάβρωση, φθορά και χημική προσβολή
• Δομική συγκολλητική ουσία μετάλλων υψηλής αντοχής`,
  },
  "Belzona 2111": {
    en: `Belzona 2111 (D&A Hi-Build Elastomer) is a 2-part polyurethane resin designed for the repair, rebuilding and coating of rubber and metal components. This flexible material suits applications requiring high build, durability, elasticity and high abrasion and tear resistance. It is easy to mix and apply without specialist tools and cures at room temperature, eliminating hot work.

Key benefits:
• Outstanding protection against wear, impact and abrasion with high elasticity
• Fast cold-curing — no hot work involved
• Excellent adhesion to many substrates including natural rubber, nitrile, neoprene, SBR, polyurethane, PVC, steel, copper and concrete
• Seamless application — small or large areas treated in one operation
• Outstanding mechanical strength and excellent chemical resistance
• Good electrical resistance and protection against erosion and corrosion

Typical applications:
• Creation and repair of rubber linings for long-term abrasion resistance
• On-site repair and encapsulation of clip joints on conveyor belts
• Reforming and bonding of flights and cleats on conveyor belts
• Cold-curing alternative to vulcanised rubber repair of worn, split or torn rubber, and impact/wear protection on pump volutes and impellers`,
    el: `Το Belzona 2111 (D&A Hi-Build Elastomer) είναι μια διμερής ρητίνη πολυουρεθάνης για επισκευή, ανακατασκευή και επίστρωση εξαρτημάτων από καουτσούκ και μέταλλο. Το εύκαμπτο υλικό είναι κατάλληλο εκεί όπου απαιτούνται μεγάλο πάχος, αντοχή, ελαστικότητα και υψηλή αντοχή στην τριβή και τη σχίση. Αναμειγνύεται και εφαρμόζεται εύκολα χωρίς ειδικά εργαλεία και ωριμάζει σε θερμοκρασία περιβάλλοντος χωρίς θερμές εργασίες.

Βασικά πλεονεκτήματα:
• Εξαιρετική προστασία από φθορά, κρούση και τριβή, με υψηλή ελαστικότητα
• Ταχεία ψυχρή ωρίμανση — χωρίς θερμές εργασίες
• Άριστη πρόσφυση σε πολλά υποστρώματα: φυσικό καουτσούκ, νιτρίλιο, νεοπρένιο, SBR, πολυουρεθάνη, PVC, χάλυβα, χαλκό και σκυρόδεμα
• Ενιαία εφαρμογή — μικρές ή μεγάλες επιφάνειες σε μία διαδικασία
• Εξαιρετική μηχανική αντοχή και άριστη χημική αντοχή
• Καλή ηλεκτρική αντοχή και προστασία από διάβρωση και φθορά

Τυπικές εφαρμογές:
• Δημιουργία και επισκευή επενδύσεων καουτσούκ για μακροχρόνια αντοχή στην τριβή
• Επιτόπια επισκευή και ενθυλάκωση συνδέσμων σε ιμάντες μεταφοράς
• Αναμόρφωση και συγκόλληση πτερυγίων σε ιμάντες μεταφοράς
• Ψυχρά ωριμαζόμενη εναλλακτική του βουλκανισμού για φθαρμένο/σχισμένο καουτσούκ και προστασία αντλιών (κελύφη, πτερωτές)`,
  },
  "Belzona 2311": {
    en: `Belzona 2311 (SR Elastomer / SuperFlex) is a 2-part polyurethane resin for fast repair, rebuilding and coating of rubber and metal components. Designed for emergency and permanent applications requiring high build, durability, elasticity and high abrasion and tear resistance, this very fast cold-curing material is easy to mix and apply without specialist tools, curing at room temperature with no hot work.

Key benefits:
• Outstanding protection against wear, impact and abrasion
• Very fast cure for emergency repairs — components back in service almost immediately
• Cold-curing with no hot work; packaged in convenient pocket-sized sachets
• Excellent adhesion to many substrates including natural rubber, nitrile, neoprene, SBR, polyurethane, PVC, steel, copper and concrete
• Outstanding mechanical strength and elongation (up to 450%)
• 100% solids, with excellent chemical and good electrical resistance, plus erosion and corrosion protection

Typical applications:
• Emergency repair of rubber components and floating-hose rubber coatings with minimal downtime
• Cold-curing alternative to vulcanised repair of worn, split or torn conveyor belts
• Durable impact and wear protection on pump volutes and impellers
• Repair of tyre sidewall cracks on heavy-duty trucks, worn gasket seals and rubber rollers`,
    el: `Το Belzona 2311 (SR Elastomer / SuperFlex) είναι μια διμερής ρητίνη πολυουρεθάνης για ταχεία επισκευή, ανακατασκευή και επίστρωση εξαρτημάτων από καουτσούκ και μέταλλο. Σχεδιασμένο για επείγουσες και μόνιμες εφαρμογές που απαιτούν μεγάλο πάχος, αντοχή, ελαστικότητα και υψηλή αντοχή στην τριβή και τη σχίση, το πολύ ταχέως ψυχρά ωριμαζόμενο υλικό αναμειγνύεται και εφαρμόζεται εύκολα χωρίς ειδικά εργαλεία, ωριμάζοντας σε θερμοκρασία περιβάλλοντος χωρίς θερμές εργασίες.

Βασικά πλεονεκτήματα:
• Εξαιρετική προστασία από φθορά, κρούση και τριβή
• Πολύ ταχεία ωρίμανση για επείγουσες επισκευές — άμεση επαναλειτουργία εξαρτημάτων
• Ψυχρή ωρίμανση χωρίς θερμές εργασίες· συσκευασία σε εύχρηστα φακελάκια τσέπης
• Άριστη πρόσφυση σε πολλά υποστρώματα: φυσικό καουτσούκ, νιτρίλιο, νεοπρένιο, SBR, πολυουρεθάνη, PVC, χάλυβα, χαλκό και σκυρόδεμα
• Εξαιρετική μηχανική αντοχή και επιμήκυνση (έως 450%)
• 100% στερεά, με άριστη χημική και καλή ηλεκτρική αντοχή, καθώς και προστασία από διάβρωση/φθορά

Τυπικές εφαρμογές:
• Επείγουσα επισκευή εξαρτημάτων καουτσούκ και επενδύσεων πλωτών σωλήνων με ελάχιστο χρόνο ακινητοποίησης
• Ψυχρά ωριμαζόμενη εναλλακτική του βουλκανισμού για φθαρμένους/σχισμένους ιμάντες μεταφοράς
• Ανθεκτική προστασία αντλιών (κελύφη, πτερωτές) από κρούση και φθορά
• Επισκευή ρωγμών πλευρικού τοιχώματος ελαστικών βαρέων οχημάτων, φθαρμένων τσιμουχών και κυλίνδρων`,
  },
  "Belzona SuperWrap II": {
    en: `Belzona SuperWrap II is a composite wrap system that restores the strength of holed, weakened and corroded pipe and tank walls. It comprises a 100% solids resin system, a bespoke hybrid reinforcement sheet (glass and carbon fibre) and a release film for compaction and consolidation. Available in four resin grades (Belzona 1981, 1982, 1983 and 1984), it suits a range of environments and service temperatures from -60°C (-76°F) up to 150°C (302°F).

It is specially designed for fast, simple, in-situ repair of through-wall and thin-wall defects on pipes and tank walls — even in aqueous environments — and is a reliable alternative to welding that avoids replacing defective metallic substrates.

Key benefits:
• Can be designed and applied in accordance with ISO 24817 and ASME PCC-2 by trained and validated personnel
• Quick and easy to install, without the need for shutdown
• Can be applied in damp, wet and underwater environments without abrasive blasting (with the surface-tolerant grade)
• Outstanding chemical and corrosion resistance; thermal expansion similar to steel
• Excellent adhesion to carbon steel; 100% solids for reduced health & safety risks
• Validated training available for Designers, Supervisors and Installers

Typical applications:
• Composite wrap repair of complex pipe geometries — bends, straights and tees
• Wet-applied composite patch repairs of large-diameter pipes (over 60 cm) and tank walls
• Prefabricated, pre-cured composite plate for plate-bonding applications
• Prefabricated composite pad for pipe support, overcoatable with an erosion-resistant coating`,
    el: `Το Belzona SuperWrap II είναι ένα σύστημα σύνθετης περιτύλιξης που αποκαταστά την αντοχή σε διάτρητα, εξασθενημένα και διαβρωμένα τοιχώματα σωλήνων και δεξαμενών. Αποτελείται από σύστημα ρητίνης 100% στερεών, ειδικό υβριδικό φύλλο ενίσχυσης (ίνες γυαλιού και άνθρακα) και φιλμ αποκόλλησης για συμπίεση και στερεοποίηση. Διατίθεται σε τέσσερις τύπους ρητίνης (Belzona 1981, 1982, 1983 και 1984), κατάλληλους για διάφορα περιβάλλοντα και θερμοκρασίες λειτουργίας από -60°C (-76°F) έως 150°C (302°F).

Είναι ειδικά σχεδιασμένο για ταχεία, απλή, επιτόπια επισκευή διαμπερών και λεπτών ελαττωμάτων σε τοιχώματα σωλήνων και δεξαμενών — ακόμη και σε υδάτινα περιβάλλοντα — και αποτελεί αξιόπιστη εναλλακτική της συγκόλλησης που αποφεύγει την αντικατάσταση του ελαττωματικού μετάλλου.

Βασικά πλεονεκτήματα:
• Σχεδιασμός και εφαρμογή σύμφωνα με ISO 24817 και ASME PCC-2 από εκπαιδευμένο και πιστοποιημένο προσωπικό
• Γρήγορη και εύκολη εφαρμογή, χωρίς ανάγκη διακοπής λειτουργίας
• Εφαρμογή σε υγρά και υποβρύχια περιβάλλοντα χωρίς αμμοβολή (με τον τύπο surface-tolerant)
• Εξαιρετική χημική αντοχή και αντοχή σε διάβρωση· θερμική διαστολή παρόμοια με του χάλυβα
• Άριστη πρόσφυση στον ανθρακούχο χάλυβα· 100% στερεά για μειωμένους κινδύνους υγείας & ασφάλειας
• Διαθέσιμη πιστοποιημένη εκπαίδευση για Σχεδιαστές, Επόπτες και Εφαρμοστές

Τυπικές εφαρμογές:
• Επισκευή σύνθετης γεωμετρίας σωλήνων — γωνίες, ευθείες και ταυ
• Επισκευές με σύνθετο μπάλωμα σε σωλήνες μεγάλης διαμέτρου (άνω των 60 cm) και τοιχώματα δεξαμενών
• Προκατασκευασμένη, προ-ωριμασμένη σύνθετη πλάκα για εφαρμογές συγκόλλησης πλακών
• Προκατασκευασμένο σύνθετο υπόθεμα στήριξης σωλήνων, με δυνατότητα επικάλυψης από αντιδιαβρωτική επίστρωση`,
  },
};

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const conn = await mysql.createConnection(url);
let updated = 0;
for (const [code, { en, el }] of Object.entries(DATA)) {
  const [res] = await conn.execute(
    "UPDATE products SET descriptionEn = ?, descriptionEl = ? WHERE code = ?",
    [en, el, code],
  );
  console.log(`${code}: affected=${res.affectedRows} (EN ${en.length} chars / EL ${el.length} chars)`);
  updated += res.affectedRows;
}
console.log(`Done. Rows updated: ${updated}`);
await conn.end();
