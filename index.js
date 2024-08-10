const { readFileSync, writeFileSync } = require('fs')
const {
  getBehavior,
  parseSaveGame,
  writeSaveGame,
  MinionIdentityBehavior,
  AIAttributeLevelsBehavior, AITraitsBehavior
} = require('oni-save-parser')

const folder = '~/Library/Application Support/unity.Klei.Oxygen Not Included/cloud_save_files/76561198090025344/Galaxy/'


function loadFile(fileName) {
  const fileData = readFileSync(`${folder}/${fileName}.sav`)
  return parseSaveGame(fileData.buffer)
}

function saveFile(fileName, save) {
  const fileData = writeSaveGame(save)
  writeFileSync(`${folder}/${fileName}.sav`, new Uint8Array(fileData))
}

function addTrait(trait, name ) {
  if (trait.templateData.TraitIds.indexOf(name) === -1) {
    trait.templateData.TraitIds.push(name)
  }
}


const fileName = '336'
const saveData = loadFile(fileName)

// console.log(saveData);

const minions = saveData.gameObjects.find(x => x.name === 'Minion')

for (const minion of minions.gameObjects) {
  const identity = getBehavior(minion, MinionIdentityBehavior)
  console.log('#############################################################################')
  console.log(identity.templateData.name + `  [${identity.templateData.gender}]`)


  // console.log(minion)
  // minion.behaviors.forEach(behavior => {
  //   console.log('behavior------------------')
  //   console.log(behavior.name)
  //   console.log(behavior.templateData)
  // })


  console.log('traits:')

  const trait = getBehavior(minion, AITraitsBehavior)
  console.log(trait.templateData.TraitIds)

  // FastLearner StrongImmuneSystem  GrantSkill_Mining3 | SparkleStreaker SuperProductive
  const superTraits  =[
    "FastLearner",
    "StrongImmuneSystem",
    "SparkleStreaker",
    "SuperProductive",
    "IronGut",
    // "InteriorDecorator",

    // ---------
    "GrantSkill_Suits1",
    "GrantSkill_Engineering1",
    "GrantSkill_Basekeeping1",
    "GrantSkill_Basekeeping2",
    "GrantSkill_Technicals1",
    "GrantSkill_Technicals2",
    "GrantSkill_Arting1",
    "GrantSkill_Arting2",
    "GrantSkill_Arting3",
    "GrantSkill_Medicine1",
    "GrantSkill_Medicine2",
    "GrantSkill_Medicine3",
    "GrantSkill_Mining1",
    "GrantSkill_Mining2",
    "GrantSkill_Mining3",
    "GrantSkill_Mining4",
    "GrantSkill_Hauling1",
    "GrantSkill_Hauling2",
    "GrantSkill_Building1",
    "GrantSkill_Building2",
    "GrantSkill_Building3",
    "GrantSkill_Researching1",
    "GrantSkill_Researching2",
    "GrantSkill_Researching3",
    "GrantSkill_Researching4",
    "DeeperDiversLungs",
    "Regeneration",
    "SunnyDisposition"
  ]

  trait.templateData.TraitIds = superTraits

  // addTrait(trait, "GrantSkill_Suits1")
  const skillBehavior = getBehavior(minion, AIAttributeLevelsBehavior)

  // Set each attribute to 10
  for (const attribute of skillBehavior.templateData.saveLoadLevels) {
    // console.log(attribute);
    attribute.level = 170
  }
}


saveFile(`${fileName}-tweaked`, saveData)