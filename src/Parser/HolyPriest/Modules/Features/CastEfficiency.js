import SPELLS from 'common/SPELLS';

import CoreCastEfficiency from 'Parser/Core/Modules/CastEfficiency';
import { calculateMaxCasts } from 'Parser/Core/getCastEfficiency';

class CastEfficiency extends CoreCastEfficiency {
  static CPM_ABILITIES = [
    ...CoreCastEfficiency.CPM_ABILITIES,
    // HW:Sanc and HW:Serenity not included due to Serendipity causing an odd situation with their CDs
    {
      spell: SPELLS.PRAYER_OF_MENDING_CAST,
      name: 'Prayer of Mending',
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: (haste, combatant) => ((12 - (combatant.hasTalent(SPELLS.PIETY_TALENT.id) ? 2 : 0)) + 1.5) / (1 + haste), // +1.5 for base cast time
    },
    {
      spell: SPELLS.LIGHT_OF_TUURE_TRAIT,
      name: 'Light of T\'uure',
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 45,
      getMaxCasts: (cooldown, fightDuration, getAbility, parser) => calculateMaxCasts(cooldown, fightDuration, 2),
      noSuggestion: true,
    },
    {
      spell: SPELLS.DESPERATE_PRAYER,
      name: 'Desperate Prayer',
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 90, // note: this number will be slightest under-represented due to our trait causing DP resets from damage
      noSuggestion: true,
    },
    {
      spell: SPELLS.APOTHEOSIS_TALENT,
      name: 'Apotheosis',
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 180,
      isActive: combatant => combatant.hasTalent(SPELLS.APOTHEOSIS_TALENT.id),
    },
    {
      spell: SPELLS.DIVINE_HYMN_CAST,
      name: 'Divine Hymn',
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 180,
    },
    {
      spell: SPELLS.DIVINE_STAR_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 15,
      isActive: combatant => combatant.hasTalent(SPELLS.DIVINE_STAR_TALENT.id),
    },
    {
      spell: SPELLS.HALO_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 40,
      isActive: combatant => combatant.hasTalent(SPELLS.HALO_TALENT.id),
      getOverhealing: (_, getAbility) => {
        const { healingEffective, healingAbsorbed, healingOverheal } = getAbility(SPELLS.HALO_HEAL.id);
        return healingOverheal / (healingEffective + healingAbsorbed + healingOverheal);
      },
    },
    {
      spell: SPELLS.CIRCLE_OF_HEALING_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 15 / (1 + haste),
      isActive: combatant => combatant.hasTalent(SPELLS.CIRCLE_OF_HEALING_TALENT.id),
    },

    // Global CPM abilities
    {
      spell: SPELLS.ARCANE_TORRENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 90,
      hideWithZeroCasts: true,
    },
  ];
}

export default CastEfficiency;
