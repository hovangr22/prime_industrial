-- Comprehensive update script for all Belzona products with full official descriptions (EN/EL)
-- Based on official belzona.com product pages

UPDATE products SET 
  descriptionEn = 'An epoxy-based composite for metal repair. Belzona 1111 is a 2-part epoxy repair composite for metal repair and resurfacing. It is reinforced with silicon steel alloy and provides excellent mechanical properties. Ideal for repairing worn, damaged or corroded metal surfaces in industrial equipment.',
  descriptionEl = 'Σύνθετο υλικό που βασίζεται σε εποξική ρητίνη για επιδιόρθωση μετάλλων. Το Belzona 1111 είναι ένα σύνθετο υλικό δύο συστατικών για επιδιόρθωση και αποκατάσταση μετάλλων. Ενισχύεται με κράμα χάλυβα πυριτίου και παρέχει εξαιρετικές μηχανικές ιδιότητες. Ιδανικό για επιδιόρθωση φθαρμένων, ζημιωμένων ή διαβρωμένων μεταλλικών επιφανειών σε βιομηχανικό εξοπλισμό.'
WHERE code = '1111';

UPDATE products SET 
  descriptionEn = 'An epoxy-based repair composite with extended working life for metal repair. Belzona 1121 provides extended working time, allowing for larger repairs and more complex applications. Reinforced with silicon steel alloy for superior strength and durability in harsh environments.',
  descriptionEl = 'Σύνθετο υλικό επιδιόρθωσης που βασίζεται σε εποξική ρητίνη με παρατεταμένο χρόνο εργασίας για επιδιόρθωση μετάλλων. Το Belzona 1121 παρέχει παρατεταμένο χρόνο εργασίας, επιτρέποντας μεγαλύτερες επιδιορθώσεις και πιο σύνθετες εφαρμογές. Ενισχύεται με κράμα χάλυβα πυριτίου για ανώτερη αντοχή και ανθεκτικότητα σε δύσκολα περιβάλλοντα.'
WHERE code = '1121';

UPDATE products SET 
  descriptionEn = 'A self-lubricating epoxy metal repair composite for creation of low friction surfaces and protection of lubrication systems from wear and seizure. Belzona 1131 contains solid lubricants that reduce friction and wear on moving parts, extending equipment life and improving efficiency.',
  descriptionEl = 'Ένα αυτολιπαινόμενο σύνθετο υλικό εποξικής επιδιόρθωσης μετάλλων για δημιουργία επιφανειών χαμηλής τριβής και προστασία συστημάτων λίπανσης από φθορά και κατάσταση. Το Belzona 1131 περιέχει στερεά λιπαντικά που μειώνουν την τριβή και τη φθορά σε κινούμενα μέρη, παρατείνοντας τη διάρκεια ζωής του εξοπλισμού και βελτιώνοντας την απόδοση.'
WHERE code = '1131';

UPDATE products SET 
  descriptionEn = 'A metal repair composite for rebuilding pitting and metal loss caused by erosion and corrosion. Belzona 1151 is specifically designed to restore surfaces damaged by erosive attack, providing excellent adhesion and mechanical strength for long-term protection.',
  descriptionEl = 'Ένα σύνθετο υλικό επιδιόρθωσης μετάλλων για ανοικοδόμηση διάβρωσης και απώλειας μετάλλου που προκαλείται από διάβρωση και διάβρωση. Το Belzona 1151 έχει σχεδιαστεί ειδικά για αποκατάσταση επιφανειών που έχουν ζημιωθεί από διαβρωτική επίθεση, παρέχοντας εξαιρετική συνάφεια και μηχανική αντοχή για μακροπρόθεσμη προστασία.'
WHERE code = '1151';

UPDATE products SET 
  descriptionEn = 'An epoxy-based repair composite for application to wet and oil contaminated metal surfaces. Belzona 1161 is specifically formulated to cure on damp, wet, and oil-contaminated substrates, making it ideal for emergency repairs in challenging field conditions.',
  descriptionEl = 'Ένα σύνθετο υλικό επιδιόρθωσης που βασίζεται σε εποξική ρητίνη για εφαρμογή σε υγρές και λαδιού μολυσμένες μεταλλικές επιφάνειες. Το Belzona 1161 είναι ειδικά διαμορφωμένο για σκλήρυνση σε υγρές, υγρές και λαδιού μολυσμένα υποστρώματα, καθιστώντας το ιδανικό για επείγουσες επιδιορθώσεις σε δύσκολες συνθήκες πεδίου.'
WHERE code = '1161';

UPDATE products SET 
  descriptionEn = 'Surface-tolerant epoxy composite for emergency in-situ metal repair of oil contaminated, wet and underwater substrates. Belzona 1212 cures underwater and on heavily contaminated surfaces, providing reliable emergency repairs in the most challenging conditions.',
  descriptionEl = 'Σύνθετο υλικό ανθεκτικό στην επιφάνεια για επείγουσα επιδιόρθωση μετάλλων in-situ σε λαδιού μολυσμένα, υγρά και υποθαλάσσια υποστρώματα. Το Belzona 1212 σκληρύνεται υποθαλάσσια και σε έντονα μολυσμένες επιφάνειες, παρέχοντας αξιόπιστες επείγουσες επιδιορθώσεις στις πιο δύσκολες συνθήκες.'
WHERE code = '1212';

UPDATE products SET 
  descriptionEn = 'A fast-curing metal repair composite for high speed emergency repairs. Belzona 1221 sets rapidly, allowing equipment to return to service quickly while maintaining excellent mechanical properties and durability for long-term performance.',
  descriptionEl = 'Ένα σύνθετο υλικό επιδιόρθωσης μετάλλων που σκληρύνεται γρήγορα για επείγουσες επιδιορθώσεις υψηλής ταχύτητας. Το Belzona 1221 ρυθμίζεται γρήγορα, επιτρέποντας στον εξοπλισμό να επιστρέψει σε λειτουργία γρήγορα διατηρώντας εξαιρετικές μηχανικές ιδιότητες και ανθεκτικότητα για μακροπρόθεσμη απόδοση.'
WHERE code = '1221';

UPDATE products SET 
  descriptionEn = 'A heat activated metal repair composite for in-situ repair and protection of hot metal surfaces with minimal surface preparation. Belzona 1251 activates when applied to hot surfaces, eliminating the need for cooling and allowing rapid repairs on operating equipment.',
  descriptionEl = 'Ένα σύνθετο υλικό επιδιόρθωσης μετάλλων που ενεργοποιείται με θερμότητα για επιδιόρθωση και προστασία in-situ θερμών μεταλλικών επιφανειών με ελάχιστη προετοιμασία επιφάνειας. Το Belzona 1251 ενεργοποιείται όταν εφαρμόζεται σε θερμές επιφάνειες, εξαλείφοντας την ανάγκη για ψύξη και επιτρέποντας γρήγορες επιδιορθώσεις σε λειτουργούντα εξοπλισμό.'
WHERE code = '1251';

UPDATE products SET 
  descriptionEn = 'A ceramic filled epoxy-based composite for metal repair and erosion and corrosion protection. Belzona 1311 contains ceramic particles that provide enhanced abrasion resistance and durability in harsh environments. Superior protection against chemical attack and erosive conditions.',
  descriptionEl = 'Ένα σύνθετο υλικό που περιέχει κεραμικά και βασίζεται σε εποξική ρητίνη για επιδιόρθωση μετάλλων και προστασία από διάβρωση και διάβρωση. Το Belzona 1311 περιέχει κεραμικά σωματίδια που παρέχουν ενισχυμένη αντίσταση στη φθορά και ανθεκτικότητα σε δύσκολα περιβάλλοντα. Ανώτερη προστασία κατά της χημικής επίθεσης και των διαβρωτικών συνθηκών.'
WHERE code = '1311';

UPDATE products SET 
  descriptionEn = 'A ceramic filled epoxy coating designed to provide erosion and corrosion resistance of metal surfaces. Belzona 1321 offers superior protection for equipment operating in corrosive industrial environments, with excellent adhesion and long-term durability.',
  descriptionEl = 'Ένα εποξικό επίχρισμα που περιέχει κεραμικά και έχει σχεδιαστεί για να παρέχει αντίσταση στη διάβρωση και διάβρωση μεταλλικών επιφανειών. Το Belzona 1321 προσφέρει ανώτερη προστασία για εξοπλισμό που λειτουργεί σε διαβρωτικά βιομηχανικά περιβάλλοντα, με εξαιρετική συνάφεια και μακροπρόθεσμη ανθεκτικότητα.'
WHERE code = '1321';

UPDATE products SET 
  descriptionEn = 'A spray or brush-applied epoxy coating for erosion and corrosion protection of equipment operating under continuous immersion. Belzona 1331 provides excellent chemical resistance and mechanical protection for submerged equipment and internal linings.',
  descriptionEl = 'Ένα εποξικό επίχρισμα που εφαρμόζεται με ψεκασμό ή βούρτσα για προστασία από διάβρωση και διάβρωση εξοπλισμού που λειτουργεί υπό συνεχή βύθιση. Το Belzona 1331 παρέχει εξαιρετική χημική αντίσταση και μηχανική προστασία για βυθισμένο εξοπλισμό και εσωτερικά επιχρίσματα.'
WHERE code = '1331';

UPDATE products SET 
  descriptionEn = 'An epoxy coating designed to improve efficiency of pumps, pipes, valves and other fluid handling equipment while providing outstanding erosion and corrosion protection. Belzona 1341 reduces friction and improves flow characteristics, resulting in increased equipment efficiency.',
  descriptionEl = 'Ένα εποξικό επίχρισμα που έχει σχεδιαστεί για να βελτιώσει την απόδοση αντλιών, σωλήνων, βαλβίδων και άλλου εξοπλισμού χειρισμού ρευστών, ενώ παρέχει εξαιρετική προστασία από διάβρωση και διάβρωση. Το Belzona 1341 μειώνει την τριβή και βελτιώνει τα χαρακτηριστικά ροής, με αποτέλεσμα αυξημένη απόδοση εξοπλισμού.'
WHERE code = '1341';

UPDATE products SET 
  descriptionEn = 'An NSF/ANSI 61 approved epoxy coating designed to improve efficiency of pumps, pipes, valves and other fluid handling equipment while providing outstanding erosion and corrosion protection. Belzona 1341N is approved for contact with potable water.',
  descriptionEl = 'Ένα εποξικό επίχρισμα που έχει εγκριθεί από NSF/ANSI 61 και έχει σχεδιαστεί για να βελτιώσει την απόδοση αντλιών, σωλήνων, βαλβίδων και άλλου εξοπλισμού χειρισμού ρευστών. Το Belzona 1341N είναι εγκεκριμένο για επαφή με πόσιμο νερό.'
WHERE code = '1341N';

UPDATE products SET 
  descriptionEn = 'A spray or brush-applied high temperature epoxy coating for erosion and corrosion protection of equipment operating under continuous immersion. Belzona 1381 maintains its protective properties at elevated temperatures, ideal for hot process equipment.',
  descriptionEl = 'Ένα εποξικό επίχρισμα υψηλής θερμοκρασίας που εφαρμόζεται με ψεκασμό ή βούρτσα για προστασία από διάβρωση και διάβρωση εξοπλισμού που λειτουργεί υπό συνεχή βύθιση. Το Belzona 1381 διατηρεί τις προστατευτικές του ιδιότητες σε υψηλές θερμοκρασίες, ιδανικό για εξοπλισμό θερμής διεργασίας.'
WHERE code = '1381';

UPDATE products SET 
  descriptionEn = 'A spray-applied epoxy coating for corrosion protection of high temperature equipment operating under immersion. Belzona 1391S provides excellent protection for equipment in thermal processing applications with superior chemical and erosion resistance.',
  descriptionEl = 'Ένα εποξικό επίχρισμα που εφαρμόζεται με ψεκασμό για προστασία από διάβρωση εξοπλισμού υψηλής θερμοκρασίας που λειτουργεί υπό βύθιση. Το Belzona 1391S παρέχει εξαιρετική προστασία για εξοπλισμό σε εφαρμογές θερμικής επεξεργασίας με ανώτερη χημική και διαβρωτική αντίσταση.'
WHERE code = '1391S';

UPDATE products SET 
  descriptionEn = 'Hand-applied erosion and corrosion resistant coating for high temperature equipment operating under immersion. Belzona 1391T is applied by hand for precise coverage on complex geometries, providing reliable protection in demanding thermal environments.',
  descriptionEl = 'Επίχρισμα αντίστασης στη διάβρωση και διάβρωση που εφαρμόζεται με το χέρι για εξοπλισμό υψηλής θερμοκρασίας που λειτουργεί υπό βύθιση. Το Belzona 1391T εφαρμόζεται με το χέρι για ακριβή κάλυψη σε σύνθετες γεωμετρίες, παρέχοντας αξιόπιστη προστασία σε απαιτητικά θερμικά περιβάλλοντα.'
WHERE code = '1391T';

UPDATE products SET 
  descriptionEn = 'Erosion, corrosion and chemical resistant coating for high temperature equipment operating under immersion. Belzona 1392 combines ceramic technology with epoxy resin for superior protection against multiple attack mechanisms in extreme service conditions.',
  descriptionEl = 'Επίχρισμα αντίστασης στη διάβρωση, διάβρωση και χημική επίθεση για εξοπλισμό υψηλής θερμοκρασίας που λειτουργεί υπό βύθιση. Το Belzona 1392 συνδυάζει την τεχνολογία κεραμικών με εποξική ρητίνη για ανώτερη προστασία κατά πολλαπλών μηχανισμών επίθεσης σε ακραίες συνθήκες υπηρεσίας.'
WHERE code = '1392';

UPDATE products SET 
  descriptionEn = 'High temperature epoxy repair composite for rebuilding equipment damaged by erosion and corrosion. Belzona 1511 maintains its mechanical properties at elevated temperatures, ideal for hot equipment repairs in thermal processing facilities.',
  descriptionEl = 'Σύνθετο υλικό επιδιόρθωσης εποξικής ρητίνης υψηλής θερμοκρασίας για ανοικοδόμηση εξοπλισμού που έχει ζημιωθεί από διάβρωση και διάβρωση. Το Belzona 1511 διατηρεί τις μηχανικές του ιδιότητες σε υψηλές θερμοκρασίες, ιδανικό για επιδιορθώσεις θερμού εξοπλισμού σε εγκαταστάσεις θερμικής επεξεργασίας.'
WHERE code = '1511';

UPDATE products SET 
  descriptionEn = 'High temperature spray-applied epoxy coating for internal lining of equipment operating under continuous immersion conditions, which provides outstanding corrosion resistance. Belzona 1523 protects internal surfaces from corrosive fluids at elevated temperatures.',
  descriptionEl = 'Εποξικό επίχρισμα υψηλής θερμοκρασίας που εφαρμόζεται με ψεκασμό για εσωτερικό επίχρισμα εξοπλισμού που λειτουργεί υπό συνεχή βύθιση, παρέχοντας εξαιρετική αντίσταση στη διάβρωση. Το Belzona 1523 προστατεύει τις εσωτερικές επιφάνειες από διαβρωτικά ρευστά σε υψηλές θερμοκρασίες.'
WHERE code = '1523';

UPDATE products SET 
  descriptionEn = 'High temperature hand-applied epoxy coating for internal lining of equipment operating under continuous immersion conditions, which provides outstanding corrosion resistance. Belzona 1593 is applied manually for precise coverage in complex internal geometries.',
  descriptionEl = 'Εποξικό επίχρισμα υψηλής θερμοκρασίας που εφαρμόζεται με το χέρι για εσωτερικό επίχρισμα εξοπλισμού που λειτουργεί υπό συνεχή βύθιση, παρέχοντας εξαιρετική αντίσταση στη διάβρωση. Το Belzona 1593 εφαρμόζεται χειροκίνητα για ακριβή κάλυψη σε σύνθετες εσωτερικές γεωμετρίες.'
WHERE code = '1593';

UPDATE products SET 
  descriptionEn = 'Abrasion resistant composite material for the repair and lining of metal surfaces subject to erosive attack. Belzona 1811 combines ceramic particles with epoxy resin for maximum resistance to particle erosion in high-velocity flow applications.',
  descriptionEl = 'Σύνθετο υλικό αντίστασης στη φθορά για επιδιόρθωση και επίχρισμα μεταλλικών επιφανειών που υπόκεινται σε διαβρωτική επίθεση. Το Belzona 1811 συνδυάζει κεραμικά σωματίδια με εποξική ρητίνη για μέγιστη αντίσταση στη διάβρωση σωματιδίων σε εφαρμογές ροής υψηλής ταχύτητας.'
WHERE code = '1811';

UPDATE products SET 
  descriptionEn = 'An abrasion resistant composite material for the repair and lining of metal surfaces suffering from fine particle erosion. Belzona 1812 is specifically formulated for protection against fine particle erosion in pneumatic conveying and similar applications.',
  descriptionEl = 'Ένα σύνθετο υλικό αντίστασης στη φθορά για επιδιόρθωση και επίχρισμα μεταλλικών επιφανειών που υποφέρουν από διάβρωση λεπτών σωματιδίων. Το Belzona 1812 είναι ειδικά διαμορφωμένο για προστασία κατά της διάβρωσης λεπτών σωματιδίων σε πνευματικές μεταφορές και παρόμοιες εφαρμογές.'
WHERE code = '1812';

UPDATE products SET 
  descriptionEn = 'A highly abrasion resistant composite material for the repair and lining of metal surfaces operating at high temperatures. Belzona 1813 maintains its protective properties while resisting particle erosion in thermal processing equipment.',
  descriptionEl = 'Ένα ιδιαίτερα ανθεκτικό στη φθορά σύνθετο υλικό για επιδιόρθωση και επίχρισμα μεταλλικών επιφανειών που λειτουργούν σε υψηλές θερμοκρασίες. Το Belzona 1813 διατηρεί τις προστατευτικές του ιδιότητες ενώ αντιστέκεται στη διάβρωση σωματιδίων σε εξοπλισμό θερμικής επεξεργασίας.'
WHERE code = '1813';

UPDATE products SET 
  descriptionEn = 'An abrasion resistant composite material for the repair and protection of metal surfaces. Belzona 1814 provides general-purpose abrasion protection for equipment subject to particle erosion in industrial applications.',
  descriptionEl = 'Ένα σύνθετο υλικό αντίστασης στη φθορά για επιδιόρθωση και προστασία μεταλλικών επιφανειών. Το Belzona 1814 παρέχει προστασία φθοράς γενικής χρήσης για εξοπλισμό που υπόκειται σε διάβρωση σωματιδίων σε βιομηχανικές εφαρμογές.'
WHERE code = '1814';

UPDATE products SET 
  descriptionEn = 'A fast curing, surface tolerant, abrasion resistant general-purpose protection system. Belzona 1818 cures rapidly on contaminated surfaces and provides reliable abrasion protection for emergency repairs and general maintenance.',
  descriptionEl = 'Ένα σύστημα προστασίας γενικής χρήσης που σκληρύνεται γρήγορα, ανθεκτικό στην επιφάνεια και αντίστασης στη φθορά. Το Belzona 1818 σκληρύνεται γρήγορα σε μολυσμένες επιφάνειες και παρέχει αξιόπιστη προστασία φθοράς για επείγουσες επιδιορθώσεις και γενική συντήρηση.'
WHERE code = '1818';

UPDATE products SET 
  descriptionEn = 'Epoxy coating system used in conjunction with Belzona aggregates to reduce slippage on metallic surfaces. Belzona 1821 creates a high-grip surface finish for safety applications on metal equipment and structures.',
  descriptionEl = 'Σύστημα εποξικού επιχρίσματος που χρησιμοποιείται σε συνδυασμό με συγκεντρώματα Belzona για μείωση της ολίσθησης σε μεταλλικές επιφάνειες. Το Belzona 1821 δημιουργεί μια επιφάνεια υψηλής πρόσφυσης για εφαρμογές ασφαλείας σε μεταλλικό εξοπλισμό και κατασκευές.'
WHERE code = '1821';

UPDATE products SET 
  descriptionEn = 'A flexible abrasion resistant polyurethane elastomer for the repair, rebuilding and coating of rubber components and metal surfaces. Belzona 2111 provides excellent elasticity and durability for flexible component repairs in demanding applications.',
  descriptionEl = 'Ένα ευλύγιστο πολυουρεθάνιο ελαστομερές αντίστασης στη φθορά για επιδιόρθωση, ανοικοδόμηση και επίχρισμα ελαστικών εξαρτημάτων και μεταλλικών επιφανειών. Το Belzona 2111 παρέχει εξαιρετική ελαστικότητα και ανθεκτικότητα για επιδιορθώσεις ευλύγιστων εξαρτημάτων σε απαιτητικές εφαρμογές.'
WHERE code = '2111';

UPDATE products SET 
  descriptionEn = 'A flexible abrasion resistant polyurethane elastomer for the casting of rubber components and coating of metal and rubber surfaces. Belzona 2131 is ideal for creating new rubber components and protective coatings with excellent flexibility and durability.',
  descriptionEl = 'Ένα ευλύγιστο πολυουρεθάνιο ελαστομερές αντίστασης στη φθορά για χύτευση ελαστικών εξαρτημάτων και επίχρισμα μεταλλικών και ελαστικών επιφανειών. Το Belzona 2131 είναι ιδανικό για δημιουργία νέων ελαστικών εξαρτημάτων και προστατευτικών επιχρισμάτων με εξαιρετική ευλυγισία και ανθεκτικότητα.'
WHERE code = '2131';

UPDATE products SET 
  descriptionEn = 'A flexible cavitation and abrasion resistant polyurethane elastomer for the coating of metal and rubber components. Belzona 2141 provides superior protection against cavitation erosion while maintaining excellent flexibility for moving parts.',
  descriptionEl = 'Ένα ευλύγιστο πολυουρεθάνιο ελαστομερές αντίστασης στη σπηλαίωση και φθορά για επίχρισμα μεταλλικών και ελαστικών εξαρτημάτων. Το Belzona 2141 παρέχει ανώτερη προστασία κατά της διάβρωσης σπηλαίωσης διατηρώντας εξαιρετική ευλυγισία για κινούμενα μέρη.'
WHERE code = '2141';

UPDATE products SET 
  descriptionEn = 'A flexible multi-purpose polyurethane elastomer for the repair, rebuilding and coating of rubber components and metal surfaces. Belzona 2211 offers versatile protection for various elastomer applications with excellent adhesion and flexibility.',
  descriptionEl = 'Ένα ευλύγιστο πολυουρεθάνιο ελαστομερές πολλαπλών χρήσεων για επιδιόρθωση, ανοικοδόμηση και επίχρισμα ελαστικών εξαρτημάτων και μεταλλικών επιφανειών. Το Belzona 2211 προσφέρει ευέλικτη προστασία για διάφορες εφαρμογές ελαστομερών με εξαιρετική συνάφεια και ευλυγισία.'
WHERE code = '2211';

UPDATE products SET 
  descriptionEn = 'A tough, flexible multi-purpose polyurethane elastomer for the repair and coating of rubber components and metal surfaces and casting of new components. Belzona 2221 combines strength with flexibility for comprehensive elastomer solutions.',
  descriptionEl = 'Ένα ανθεκτικό, ευλύγιστο πολυουρεθάνιο ελαστομερές πολλαπλών χρήσεων για επιδιόρθωση και επίχρισμα ελαστικών εξαρτημάτων και μεταλλικών επιφανειών και χύτευση νέων εξαρτημάτων. Το Belzona 2221 συνδυάζει την αντοχή με την ευλυγισία για ολοκληρωμένες λύσεις ελαστομερών.'
WHERE code = '2221';

UPDATE products SET 
  descriptionEn = 'A fast-curing, abrasion resistant polyurethane elastomer for high speed emergency repairs, rebuilding and coating of rubber components and metal surfaces. Belzona 2311 sets rapidly while maintaining excellent mechanical properties.',
  descriptionEl = 'Ένα γρήγορα σκληρυνόμενο, ανθεκτικό στη φθορά πολυουρεθάνιο ελαστομερές για επείγουσες επιδιορθώσεις υψηλής ταχύτητας, ανοικοδόμηση και επίχρισμα ελαστικών εξαρτημάτων και μεταλλικών επιφανειών. Το Belzona 2311 ρυθμίζεται γρήγορα διατηρώντας εξαιρετικές μηχανικές ιδιότητες.'
WHERE code = '2311';

UPDATE products SET 
  descriptionEn = 'A single component, liquid-applied roof coating for long-term roof protection and waterproofing. Belzona 3111 provides flexible, seamless protection for roof surfaces, preventing water ingress and extending roof life.',
  descriptionEl = 'Ένα εποξικό επίχρισμα στέγης μονού συστατικού που εφαρμόζεται σε υγρή μορφή για μακροπρόθεσμη προστασία στέγης και αδιαβροχοποίηση. Το Belzona 3111 παρέχει ευλύγιστη, ασυνεχή προστασία για επιφάνειες στέγης, αποτρέποντας τη διείσδυση νερού και παρατείνοντας τη διάρκεια ζωής της στέγης.'
WHERE code = '3111';

UPDATE products SET 
  descriptionEn = 'A liquid-applied emergency roof repair material providing instant waterproofing of leaking roof areas. Belzona 3121 cures quickly to seal roof leaks and prevent water damage to building interiors.',
  descriptionEl = 'Ένα υλικό επιδιόρθωσης στέγης έκτακτης ανάγκης που εφαρμόζεται σε υγρή μορφή, παρέχοντας άμεση αδιαβροχοποίηση των διαρρεόντων περιοχών στέγης. Το Belzona 3121 σκληρύνεται γρήγορα για σφράγιση διαρροών στέγης και αποτροπή ζημιάς από νερό στα εσωτερικά κτιρίων.'
WHERE code = '3121';

UPDATE products SET 
  descriptionEn = 'A liquid-applied roof coating for long-term protection and waterproofing of roofs which can be applied during winter weather conditions. Belzona 3131 maintains its protective properties even in cold weather, allowing year-round application.',
  descriptionEl = 'Ένα εποξικό επίχρισμα στέγης που εφαρμόζεται σε υγρή μορφή για μακροπρόθεσμη προστασία και αδιαβροχοποίηση στεγών που μπορεί να εφαρμοστεί κατά τις χειμερινές καιρικές συνθήκες. Το Belzona 3131 διατηρεί τις προστατευτικές του ιδιότητες ακόμη και σε κρύο καιρό, επιτρέποντας εφαρμογή όλο το χρόνο.'
WHERE code = '3131';

UPDATE products SET 
  descriptionEn = 'A single component, seamless and flexible coating for encapsulation of all types of thermal insulation and cladding systems. Belzona 3211 protects insulation from moisture and environmental damage while maintaining flexibility.',
  descriptionEl = 'Ένα εποξικό επίχρισμα μονού συστατικού, ασυνεχές και ευλύγιστο για ενκάψυλωση όλων των τύπων θερμικής μόνωσης και συστημάτων επένδυσης. Το Belzona 3211 προστατεύει τη μόνωση από υγρασία και περιβαλλοντική ζημιά διατηρώντας ευλυγισία.'
WHERE code = '3211';

UPDATE products SET 
  descriptionEn = 'Flexible and peelable system, used for encapsulating flanges and bolt fastenings to protect against moisture ingress and prevent corrosion. Belzona 3412 provides temporary or semi-permanent protection that can be easily removed for maintenance.',
  descriptionEl = 'Ευλύγιστο και αποφλοιώσιμο σύστημα, που χρησιμοποιείται για ενκάψυλωση φλάντζων και κοχλιών για προστασία κατά της διείσδυσης υγρασίας και αποτροπή διάβρωσης. Το Belzona 3412 παρέχει προσωρινή ή ημι-μόνιμη προστασία που μπορεί να αφαιρεθεί εύκολα για συντήρηση.'
WHERE code = '3412';

UPDATE products SET 
  descriptionEn = 'An epoxy repair composite for concrete and stone repair, resurfacing and protection. Belzona 4111 provides excellent adhesion to concrete and stone surfaces, ideal for repairing damaged concrete structures.',
  descriptionEl = 'Ένα σύνθετο υλικό επιδιόρθωσης εποξικής ρητίνης για επιδιόρθωση, αποκατάσταση και προστασία σκυροδέματος και πετρώματος. Το Belzona 4111 παρέχει εξαιρετική συνάφεια σε επιφάνειες σκυροδέματος και πετρώματος, ιδανικό για επιδιόρθωση ζημιωμένων κατασκευών σκυροδέματος.'
WHERE code = '4111';

UPDATE products SET 
  descriptionEn = 'An epoxy-based resin designed to be used with an aggregate for the reparation, resurfacing and rebuilding of concrete and stonework damaged by impact, vibration, chemical and environmental attack. Belzona 4124 provides bulk filling capability for large concrete repairs.',
  descriptionEl = 'Μια εποξική ρητίνη που έχει σχεδιαστεί για χρήση με ένα σύνολο για τη διόρθωση, αποκατάσταση και ανοικοδόμηση σκυροδέματος και λιθοδομής που έχει ζημιωθεί από κρούση, δόνηση, χημική και περιβαλλοντική επίθεση. Το Belzona 4124 παρέχει δυνατότητα χύτευσης μεγάλων ποσοτήτων για μεγάλες επιδιορθώσεις σκυροδέματος.'
WHERE code = '4124';

UPDATE products SET 
  descriptionEn = 'An epoxy repair composite for the resurfacing and protection of concrete and stone areas. Belzona 4131 is ideal for creating smooth, durable surfaces on concrete floors and structures.',
  descriptionEl = 'Ένα σύνθετο υλικό επιδιόρθωσης εποξικής ρητίνης για αποκατάσταση και προστασία περιοχών σκυροδέματος και πετρώματος. Το Belzona 4131 είναι ιδανικό για δημιουργία λείων, ανθεκτικών επιφανειών σε δάπεδα σκυροδέματος και κατασκευές.'
WHERE code = '4131';

UPDATE products SET 
  descriptionEn = 'A lightweight epoxy repair composite for vertical and overhead concrete and stone repairs. Belzona 4141 provides excellent adhesion and can be applied to vertical and overhead surfaces without sagging.',
  descriptionEl = 'Ένα ελαφρύ σύνθετο υλικό επιδιόρθωσης εποξικής ρητίνης για κάθετες και ανώφλι επιδιορθώσεις σκυροδέματος και πετρώματος. Το Belzona 4141 παρέχει εξαιρετική συνάφεια και μπορεί να εφαρμοστεί σε κάθετες και ανώφλι επιφάνειες χωρίς να χαμηλώσει.'
WHERE code = '4141';

UPDATE products SET 
  descriptionEn = 'An epoxy resin for the treatment and protection of concrete surfaces exposed to chemical attack and abrasion. Belzona 4151 is used with aggregates to create protective linings and coatings on concrete structures.',
  descriptionEl = 'Μια εποξική ρητίνη για τη θεραπεία και προστασία επιφανειών σκυροδέματος που εκτίθενται σε χημική επίθεση και φθορά. Το Belzona 4151 χρησιμοποιείται με συγκεντρώματα για δημιουργία προστατευτικών επιχρισμάτων και επιχρισμάτων σε κατασκευές σκυροδέματος.'
WHERE code = '4151';

UPDATE products SET 
  descriptionEn = 'An epoxy-based resin designed to be used with an aggregate for the reparation, resurfacing and rebuilding of concrete and stonework damaged by impact, vibration, chemical and environmental attack. Belzona 4154 provides bulk filling for large-scale concrete repairs.',
  descriptionEl = 'Μια εποξική ρητίνη που έχει σχεδιαστεί για χρήση με ένα σύνολο για τη διόρθωση, αποκατάσταση και ανοικοδόμηση σκυροδέματος και λιθοδομής που έχει ζημιωθεί από κρούση, δόνηση, χημική και περιβαλλοντική επίθεση. Το Belzona 4154 παρέχει χύτευση μεγάλων ποσοτήτων για επιδιορθώσεις σκυροδέματος μεγάλης κλίμακας.'
WHERE code = '4154';

UPDATE products SET 
  descriptionEn = 'An acid and heat resistant epoxy repair composite for concrete and stone repair, resurfacing and protection. Belzona 4181 provides superior protection in aggressive chemical environments while maintaining mechanical strength.',
  descriptionEl = 'Ένα σύνθετο υλικό επιδιόρθωσης εποξικής ρητίνης ανθεκτικό στο οξύ και τη θερμότητα για επιδιόρθωση, αποκατάσταση και προστασία σκυροδέματος και πετρώματος. Το Belzona 4181 παρέχει ανώτερη προστασία σε επιθετικά χημικά περιβάλλοντα διατηρώντας μηχανική αντοχή.'
WHERE code = '4181';

UPDATE products SET 
  descriptionEn = 'A chemical resistant epoxy material for rebuilding metal and concrete surfaces and protection against chemical attack. Belzona 4301 provides high-build protection for equipment in chemical processing facilities.',
  descriptionEl = 'Ένα υλικό εποξικής ρητίνης ανθεκτικό στη χημική επίθεση για ανοικοδόμηση μεταλλικών και σκυροδέματος επιφανειών και προστασία κατά της χημικής επίθεσης. Το Belzona 4301 παρέχει προστασία υψηλής δόμησης για εξοπλισμό σε εγκαταστάσεις χημικής επεξεργασίας.'
WHERE code = '4301';

UPDATE products SET 
  descriptionEn = 'A chemical resistant epoxy coating for protection of concrete and metal surfaces. Belzona 4311 provides reliable protection against chemical attack while maintaining excellent adhesion and durability.',
  descriptionEl = 'Ένα εποξικό επίχρισμα ανθεκτικό στη χημική επίθεση για προστασία επιφανειών σκυροδέματος και μετάλλου. Το Belzona 4311 παρέχει αξιόπιστη προστασία κατά της χημικής επίθεσης διατηρώντας εξαιρετική συνάφεια και ανθεκτικότητα.'
WHERE code = '4311';

UPDATE products SET 
  descriptionEn = 'A high temperature epoxy coating for the protection of concrete and metal surfaces in contact with hot organic acids and other chemicals. Belzona 4331 maintains its protective properties at elevated temperatures in aggressive chemical environments.',
  descriptionEl = 'Ένα εποξικό επίχρισμα υψηλής θερμοκρασίας για προστασία επιφανειών σκυροδέματος και μετάλλου σε επαφή με θερμά οργανικά οξέα και άλλα χημικά. Το Belzona 4331 διατηρεί τις προστατευτικές του ιδιότητες σε υψηλές θερμοκρασίες σε επιθετικά χημικά περιβάλλοντα.'
WHERE code = '4331';

UPDATE products SET 
  descriptionEn = 'A high temperature epoxy coating for concrete and metal surfaces in contact with hot inorganic acids. Belzona 4341 provides superior protection in extreme chemical environments at elevated temperatures.',
  descriptionEl = 'Ένα εποξικό επίχρισμα υψηλής θερμοκρασίας για επιφάνειες σκυροδέματος και μετάλλου σε επαφή με θερμά ανόργανα οξέα. Το Belzona 4341 παρέχει ανώτερη προστασία σε ακραία χημικά περιβάλλοντα σε υψηλές θερμοκρασίες.'
WHERE code = '4341';

UPDATE products SET 
  descriptionEn = 'A static dissipative, chemical resistant coating for the protection of concrete and metal surfaces. Belzona 4351 provides both chemical protection and electrostatic discharge control in sensitive environments.',
  descriptionEl = 'Ένα εποξικό επίχρισμα διαχωρισμού στατικής ηλεκτρικότητας και ανθεκτικό στη χημική επίθεση για προστασία επιφανειών σκυροδέματος και μετάλλου. Το Belzona 4351 παρέχει τόσο χημική προστασία όσο και έλεγχο ηλεκτροστατικής εκφόρτισης σε ευαίσθητα περιβάλλοντα.'
WHERE code = '4351';

UPDATE products SET 
  descriptionEn = 'A flexible chemical resistant epoxy coating for concrete protection with crack-bridging properties. Belzona 4361 accommodates substrate movement while maintaining chemical protection and preventing water ingress.',
  descriptionEl = 'Ένα ευλύγιστο εποξικό επίχρισμα ανθεκτικό στη χημική επίθεση για προστασία σκυροδέματος με ιδιότητες γεφύρωσης ρωγμών. Το Belzona 4361 προσαρμόζεται στην κίνηση του υποστρώματος διατηρώντας χημική προστασία και αποτρέποντας τη διείσδυση νερού.'
WHERE code = '4361';

UPDATE products SET 
  descriptionEn = 'Hard wearing epoxy resin system for slip reduction on walking surfaces. Belzona 4411 creates high-grip surfaces for safety applications on concrete floors and industrial walkways.',
  descriptionEl = 'Σύστημα εποξικής ρητίνης ανθεκτικό στη φθορά για μείωση της ολίσθησης σε περιοχές περπατήματος. Το Belzona 4411 δημιουργεί επιφάνειες υψηλής πρόσφυσης για εφαρμογές ασφαλείας σε δάπεδα σκυροδέματος και βιομηχανικές διαδρομές.'
WHERE code = '4411';

UPDATE products SET 
  descriptionEn = 'An elastomeric expansion joint sealant for herozontal, vertical and sloped expansion joints. Belzona 4511 provides flexible sealing that accommodates joint movement while preventing water and debris ingress.',
  descriptionEl = 'Ένα ελαστομερές σφραγιστικό αρμού διαστολής για οριζόντιες, κάθετες και κεκλιμένες αρμούς διαστολής. Το Belzona 4511 παρέχει ευλύγιστη σφράγιση που προσαρμόζεται στην κίνηση του αρμού ενώ αποτρέπει τη διείσδυση νερού και συντρίμματος.'
WHERE code = '4511';

UPDATE products SET 
  descriptionEn = 'An elastomeric expansion joint sealant for sealing joints in surfaces including concrete, brick and stone. Belzona 4521 provides durable, flexible sealing for building expansion joints with excellent adhesion and movement accommodation.',
  descriptionEl = 'Ένα ελαστομερές σφραγιστικό αρμού για σφράγιση αρμών σε επιφάνειες συμπεριλαμβανομένων σκυροδέματος, τούβλου και πετρώματος. Το Belzona 4521 παρέχει ανθεκτική, ευλύγιστη σφράγιση για αρμούς διαστολής κτιρίων με εξαιρετική συνάφεια και προσαρμογή κίνησης.'
WHERE code = '4521';

UPDATE products SET 
  descriptionEn = 'A urethane coating for the protection of metallic and masonry surfaces against chemical, abrasive and corrosive attack. Belzona 5111 provides long-term protection for exterior and interior surfaces in harsh environments.',
  descriptionEl = 'Ένα εποξικό επίχρισμα για προστασία μεταλλικών και λιθοδομικών επιφανειών κατά της χημικής, φθοράς και διαβρωτικής επίθεσης. Το Belzona 5111 παρέχει μακροπρόθεσμη προστασία για εξωτερικές και εσωτερικές επιφάνειες σε δύσκολα περιβάλλοντα.'
WHERE code = '5111';

UPDATE products SET 
  descriptionEn = 'Clear, water-repellent treatment for masonry surfaces. Belzona 5122 protects porous masonry from water ingress and weathering while maintaining the natural appearance of the surface.',
  descriptionEl = 'Διαφανής, υδοαπωθητική θεραπεία για λιθοδομικές επιφάνειες. Το Belzona 5122 προστατεύει τη πορώδη λιθοδομή από διείσδυση νερού και αποσάθρωση διατηρώντας την φυσική εμφάνιση της επιφάνειας.'
WHERE code = '5122';

UPDATE products SET 
  descriptionEn = 'An epoxy floor coating which provides excellent chemical, abrasion and slip resistance. Belzona 5231 creates durable, protective floor surfaces for industrial and commercial facilities.',
  descriptionEl = 'Ένα εποξικό επίχρισμα δαπέδου που παρέχει εξαιρετική χημική αντίσταση, φθορά και ολίσθηση. Το Belzona 5231 δημιουργεί ανθεκτικές, προστατευτικές επιφάνειες δαπέδου για βιομηχανικές και εμπορικές εγκαταστάσεις.'
WHERE code = '5231';

UPDATE products SET 
  descriptionEn = 'A waterborne, 100% solids, UV stable floor coating to provide floor protection and slip-resistance at commercial and industrial facilities. Belzona 5233 is environmentally friendly while providing excellent durability and safety.',
  descriptionEl = 'Ένα υδατικό, 100% στερεό, ευσταθές στο UV εποξικό επίχρισμα δαπέδου για προστασία δαπέδου και αντίσταση ολίσθησης σε εμπορικές και βιομηχανικές εγκαταστάσεις. Το Belzona 5233 είναι φιλικό προς το περιβάλλον ενώ παρέχει εξαιρετική ανθεκτικότητα και ασφάλεια.'
WHERE code = '5233';

UPDATE products SET 
  descriptionEn = 'High Performance, Fast Curing System for Leading Edge Repairs. Belzona 5711 provides rapid curing for quick repairs on wind turbine blades and similar leading edge applications.',
  descriptionEl = 'Σύστημα υψηλής απόδοσης, γρήγορης σκλήρυνσης για επιδιορθώσεις αιχμής. Το Belzona 5711 παρέχει γρήγορη σκλήρυνση για γρήγορες επιδιορθώσεις σε πτερύγια ανεμογεννητριών και παρόμοιες εφαρμογές αιχμής.'
WHERE code = '5711';

UPDATE products SET 
  descriptionEn = 'UV and Erosion Resistant Coating for the Leading Edge Protection. Belzona 5721 protects leading edges from UV degradation and erosion in outdoor applications like wind turbines.',
  descriptionEl = 'Εποξικό επίχρισμα ανθεκτικό στο UV και τη διάβρωση για προστασία αιχμής. Το Belzona 5721 προστατεύει τις αιχμές από υποβάθμιση UV και διάβρωση σε εξωτερικές εφαρμογές όπως ανεμογεννήτριες.'
WHERE code = '5721';

UPDATE products SET 
  descriptionEn = 'An epoxy coating designed for corrosion and chemical protection of equipment operating under immersion. Belzona 5811 provides long-term protection for submerged equipment and internal linings in aggressive environments.',
  descriptionEl = 'Ένα εποξικό επίχρισμα που έχει σχεδιαστεί για προστασία διάβρωσης και χημική προστασία εξοπλισμού που λειτουργεί υπό βύθιση. Το Belzona 5811 παρέχει μακροπρόθεσμη προστασία για βυθισμένο εξοπλισμό και εσωτερικά επιχρίσματα σε επιθετικά περιβάλλοντα.'
WHERE code = '5811';

UPDATE products SET 
  descriptionEn = 'An epoxy coating designed for corrosion and chemical protection of equipment operating under immersion. Belzona 5811DW2 provides long-term protection for submerged equipment with enhanced durability.',
  descriptionEl = 'Ένα εποξικό επίχρισμα που έχει σχεδιαστεί για προστασία διάβρωσης και χημική προστασία εξοπλισμού που λειτουργεί υπό βύθιση. Το Belzona 5811DW2 παρέχει μακροπρόθεσμη προστασία για βυθισμένο εξοπλισμό με ενισχυμένη ανθεκτικότητα.'
WHERE code = '5811DW2';

UPDATE products SET 
  descriptionEn = 'Epoxy-based coating for corrosion protection, approved for contact with drinking water. Belzona 5812 DW meets potable water standards while providing excellent corrosion protection.',
  descriptionEl = 'Εποξικό επίχρισμα για προστασία διάβρωσης, εγκεκριμένο για επαφή με πόσιμο νερό. Το Belzona 5812 DW πληροί τα πρότυπα πόσιμου νερού ενώ παρέχει εξαιρετική προστασία διάβρωσης.'
WHERE code = '5812 DW';

UPDATE products SET 
  descriptionEn = 'High Performance Static Dissipative, 100% solids, Barrier Coating. Belzona 5813 provides electrostatic discharge control while protecting against corrosion in sensitive environments.',
  descriptionEl = 'Εποξικό επίχρισμα φραγμού υψηλής απόδοσης διαχωρισμού στατικής ηλεκτρικότητας, 100% στερεό. Το Belzona 5813 παρέχει έλεγχο ηλεκτροστατικής εκφόρτισης ενώ προστατεύει κατά της διάβρωσης σε ευαίσθητα περιβάλλοντα.'
WHERE code = '5813';

UPDATE products SET 
  descriptionEn = 'Containment Grade, Flexible, Barrier Coating. Belzona 5815 provides flexible protection with containment properties for spill prevention and environmental protection.',
  descriptionEl = 'Εποξικό επίχρισμα φραγμού ευλύγιστο, κατηγορίας περιεκτικότητας. Το Belzona 5815 παρέχει ευλύγιστη προστασία με ιδιότητες περιεκτικότητας για πρόληψη διαρροών και περιβαλλοντική προστασία.'
WHERE code = '5815';

UPDATE products SET 
  descriptionEn = 'A high performance epoxy-based coating for the protection of critical equipment operating under immersion and erosive conditions. Belzona 5821 combines multiple protective properties for demanding applications.',
  descriptionEl = 'Ένα εποξικό επίχρισμα υψηλής απόδοσης για προστασία κρίσιμου εξοπλισμού που λειτουργεί υπό βύθιση και διαβρωτικές συνθήκες. Το Belzona 5821 συνδυάζει πολλαπλές προστατευτικές ιδιότητες για απαιτητικές εφαρμογές.'
WHERE code = '5821';

UPDATE products SET 
  descriptionEn = 'A moisture-tolerant epoxy coating for corrosion protection of wet and oil contaminated surfaces. Belzona 5831 cures on damp substrates, ideal for emergency repairs in challenging field conditions.',
  descriptionEl = 'Ένα εποξικό επίχρισμα ανθεκτικό στην υγρασία για προστασία διάβρωσης υγρών και λαδιού μολυσμένων επιφανειών. Το Belzona 5831 σκληρύνεται σε υγρά υποστρώματα, ιδανικό για επείγουσες επιδιορθώσεις σε δύσκολες συνθήκες πεδίου.'
WHERE code = '5831';

UPDATE products SET 
  descriptionEn = 'Moisture-tolerant epoxy coating for corrosion protection of wet and oil contaminated surfaces at lower temperatures. Belzona 5831LT maintains performance in cold weather conditions.',
  descriptionEl = 'Εποξικό επίχρισμα ανθεκτικό στην υγρασία για προστασία διάβρωσης υγρών και λαδιού μολυσμένων επιφανειών σε χαμηλότερες θερμοκρασίες. Το Belzona 5831LT διατηρεί την απόδοση σε συνθήκες κρύου καιρού.'
WHERE code = '5831LT';

UPDATE products SET 
  descriptionEn = 'An epoxy coating requiring minimal surface preparation for in-situ repair and protection of hot metal surfaces subject to corrosion under insulation. Belzona 5841 enables rapid repairs on operating equipment.',
  descriptionEl = 'Ένα εποξικό επίχρισμα που απαιτεί ελάχιστη προετοιμασία επιφάνειας για επιδιόρθωση και προστασία in-situ θερμών μεταλλικών επιφανειών που υπόκεινται σε διάβρωση υπό μόνωση. Το Belzona 5841 επιτρέπει γρήγορες επιδιορθώσεις σε λειτουργούντα εξοπλισμό.'
WHERE code = '5841';

UPDATE products SET 
  descriptionEn = 'A heat activated epoxy coating for in-situ application to hot metal surfaces with minimal preparation to protect against corrosion. Belzona 5851 activates when applied to hot surfaces, eliminating cooling requirements.',
  descriptionEl = 'Ένα εποξικό επίχρισμα που ενεργοποιείται με θερμότητα για εφαρμογή in-situ σε θερμές μεταλλικές επιφάνειες με ελάχιστη προετοιμασία για προστασία κατά της διάβρωσης. Το Belzona 5851 ενεργοποιείται όταν εφαρμόζεται σε θερμές επιφάνειες, εξαλείφοντας τις απαιτήσεις ψύξης.'
WHERE code = '5851';

UPDATE products SET 
  descriptionEn = '\"Cool-to-touch\" thermal insulation barrier against corrosion. Belzona 5871 provides thermal protection while preventing corrosion on insulated equipment.',
  descriptionEl = 'Φραγμός θερμικής μόνωσης \"δροσερός στη αφή\" κατά της διάβρωσης. Το Belzona 5871 παρέχει θερμική προστασία ενώ αποτρέπει τη διάβρωση σε μονωμένο εξοπλισμό.'
WHERE code = '5871';

UPDATE products SET 
  descriptionEn = 'An epoxy coating for corrosion and chemical protection of high temperature equipment operating under immersion. Belzona 5892 maintains protective properties at elevated temperatures in aggressive environments.',
  descriptionEl = 'Ένα εποξικό επίχρισμα για προστασία διάβρωσης και χημική προστασία εξοπλισμού υψηλής θερμοκρασίας που λειτουργεί υπό βύθιση. Το Belzona 5892 διατηρεί τις προστατευτικές ιδιότητες σε υψηλές θερμοκρασίες σε επιθετικά περιβάλλοντα.'
WHERE code = '5892';

UPDATE products SET 
  descriptionEn = 'Environmental corrosion protection epoxy coating for metallic surfaces. Belzona 6111 provides long-term corrosion protection using environmentally responsible materials.',
  descriptionEl = 'Εποξικό επίχρισμα προστασίας διάβρωσης για το περιβάλλον για μεταλλικές επιφάνειες. Το Belzona 6111 παρέχει μακροπρόθεσμη προστασία διάβρωσης χρησιμοποιώντας περιβαλλοντικά υπεύθυνα υλικά.'
WHERE code = '6111';

UPDATE products SET 
  descriptionEn = 'Specially designed to endure the physical and thermal shock common to marine environments. Belzona 7111 provides reliable protection for marine equipment and structures.',
  descriptionEl = 'Ειδικά σχεδιασμένο για να αντέξει τη φυσική και θερμική σοκ που είναι κοινή σε θαλάσσια περιβάλλοντα. Το Belzona 7111 παρέχει αξιόπιστη προστασία για θαλάσσιο εξοπλισμό και κατασκευές.'
WHERE code = '7111';

UPDATE products SET 
  descriptionEn = 'An epoxy based system specifically designed as a deep pour grout for up to 20.5 cm (8 in). Belzona 7211 provides excellent flow and adhesion for deep grouting applications.',
  descriptionEl = 'Ένα σύστημα που βασίζεται σε εποξική ρητίνη ειδικά σχεδιασμένο ως ένεμα βαθιάς χύτευσης για έως 20,5 cm (8 ίντσες). Το Belzona 7211 παρέχει εξαιρετική ροή και συνάφεια για εφαρμογές βαθιάς ενέσεως.'
WHERE code = '7211';

UPDATE products SET 
  descriptionEn = 'High mechanical strength, fatigue resistant structural adhesive. Belzona 7311 provides reliable bonding for structural repairs and assembly applications.',
  descriptionEl = 'Δομικό κόλλα υψηλής μηχανικής αντοχής, ανθεκτικό στη κόπωση. Το Belzona 7311 παρέχει αξιόπιστη συγκόλληση για δομικές επιδιορθώσεις και εφαρμογές συναρμολόγησης.'
WHERE code = '7311';

UPDATE products SET 
  descriptionEn = 'A metal-free anti-seize compound which protects mating metal parts from seizure and galling caused by high temperature, corrosion and chemical attack. Belzona 8211 prevents equipment damage and facilitates maintenance.',
  descriptionEl = 'Μια σύνθεση κατά της κατάσχεσης χωρίς μέταλλο που προστατεύει τα συζευγμένα μεταλλικά μέρη από κατάσχεση και γρατσούνισμα που προκαλείται από υψηλή θερμοκρασία, διάβρωση και χημική επίθεση. Το Belzona 8211 αποτρέπει ζημιά εξοπλισμού και διευκολύνει τη συντήρηση.'
WHERE code = '8211';

UPDATE products SET 
  descriptionEn = 'A lubrication system for penetration, lubrication, de-watering and corrosion protection of components. Belzona 8311 provides multi-purpose protection for equipment maintenance and preservation.',
  descriptionEl = 'Ένα σύστημα λίπανσης για διείσδυση, λίπανση, αφαίρεση νερού και προστασία διάβρωσης εξαρτημάτων. Το Belzona 8311 παρέχει προστασία πολλαπλών χρήσεων για συντήρηση και διατήρηση εξοπλισμού.'
WHERE code = '8311';

UPDATE products SET 
  descriptionEn = 'Belzona 9611 is a mouldable, rapid-curing putty stick for emergency live leak sealing on low pressure leaks prior to the application of a permanent Belzona solution. Ideal for temporary emergency repairs.',
  descriptionEl = 'Το Belzona 9611 είναι ένας πλαστικός, γρήγορα σκληρυνόμενος ραβδός για σφράγιση διαρροών έκτακτης ανάγκης σε διαρροές χαμηλής πίεσης πριν από την εφαρμογή μιας μόνιμης λύσης Belzona. Ιδανικό για προσωρινές επείγουσες επιδιορθώσεις.'
WHERE code = '9611';

UPDATE products SET 
  descriptionEn = 'Belzona 9631 is a leak-sealing kit containing a 5cm x 150cm / 2in x 60in fiberglass pre-impregnated wrap which is activated by water. Provides quick emergency sealing of leaking pipes and equipment.',
  descriptionEl = 'Το Belzona 9631 είναι ένα κιτ σφράγισης διαρροών που περιέχει ένα περίτυλιγμα ινοπλάστ προ-εμποτισμένο 5cm x 150cm / 2in x 60in που ενεργοποιείται από νερό. Παρέχει γρήγορη έκτακτη σφράγιση διαρρεόντων σωλήνων και εξοπλισμού.'
WHERE code = '9631';

UPDATE products SET 
  descriptionEn = 'A repair kit containing all the equipment required to effectively complete a Belzona flange face forming repair when used with a Belzona metal repair composite. Provides complete solution for flange repairs.',
  descriptionEl = 'Ένα κιτ επιδιόρθωσης που περιέχει όλο τον εξοπλισμό που απαιτείται για να ολοκληρώσετε αποτελεσματικά μια επιδιόρθωση διαμόρφωσης προσώπου φλάντζας Belzona όταν χρησιμοποιείται με ένα σύνθετο υλικό επιδιόρθωσης μετάλλων Belzona. Παρέχει ολοκληρωμένη λύση για επιδιορθώσεις φλάντζας.'
WHERE code = 'FLANGE-KIT';

UPDATE products SET 
  descriptionEn = 'Belzona SuperWrap II is a composite wrap system that restores the strength of holed, weakened and corroded pipe and tank walls. It comprises a 100% solids epoxy resin reinforced with fiberglass for permanent, reliable repairs.',
  descriptionEl = 'Το Belzona SuperWrap II είναι ένα σύστημα σύνθετου περιτυλίγματος που αποκαθιστά την αντοχή διάτρητων, εξασθενημένων και διαβρωμένων τοιχωμάτων σωλήνων και δεξαμενών. Αποτελείται από εποξική ρητίνη 100% στερεά ενισχυμένη με ίνες γυαλιού για μόνιμες, αξιόπιστες επιδιορθώσεις.'
WHERE code = 'SUPERWRAP-II';
