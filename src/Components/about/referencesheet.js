import "./about.css"

export const HunterRefSheet = () => {
    return (
      <div className="reference__container">
        <h1>Hunter Agenda</h1>
        <h3>
            • Act like you’re the hero in this story (because you are).<br/>
            • Make your own destiny.<br/>
            • Find the damn monsters and stop them.<br/>
            • Play your hunter like they’re a real person.<br/>
            Think like your hunter would think. Do what your hunter would do.<br/>
            Remember that you're a badass: extremely dangerous, and good at what you do.<br/>
            You need to work out what's behind each situation. <br/>
            Then work out how to find it and what its weaknesses are.<br/>
            Then kill it.<br/>
        </h3>
        <h1>Basic Moves</h1>
        <div className="basicMoves__container">
        <div>
            <h2>Kick Some Ass</h2>
            <h3>
            When you get into a fight and kick some ass, roll +Tough.
            On a 7+, you and whatever you’re fighting inflict harm on each other. The amount of harm is based on the<br/>
            established dangers in the game. That usually means you inflict the harm rating of your weapon and your enemy inflicts<br/>
            their attack’s harm rating on you.<br/>
            On a 10+, choose one extra effect:<br/>
                • You gain the advantage: take +1 forward, or give +1 forward to another hunter.<br/>
                • You inflict terrible harm (+1 harm).<br/>
                • You suffer less harm (-1 harm).<br/>
                • You force them where you want them.<br/>
            Advanced: On a 12+ instead pick an enhanced effect:<br/>
                • You completely hold the advantage. All hunters involved in the fight get +1 forward.<br/>
                • You suffer no harm at all.<br/>
                • Your attack inflicts double the normal harm.<br/>
                • Your attack drives the enemy away in a rout.<br/>
        </h3>
        </div>
        <div>
            <h2>Manipulate Someone</h2>
            <h3>
            Once you have given them a reason, tell them what you want them to do and roll +Charm.<br/>
            For a normal person:<br/>
                • On a 10+, then they’ll do it for the reason you gave them. If you asked too much, they’ll tell you the minimum it would take for them to do it<br/>
                (or if there’s no way they’d do it).<br/>
                • On a 7-9, they’ll do it, but only if you do something for them right now to show that you mean it. If you asked too much, they’ll tell<br/>
                you what, if anything, it would take for them to do it.<br/>
            Advanced: On a 12+ not only do they do what you want right now, they also become your ally for the rest of the mystery (or, if you do enough for them, permanently).<br/>
            For another hunter:<br/>
                • On a 10+, if they do what you ask they mark experience and get +1 forward.<br/>
                • On a 7-9, they mark experience if they do what you ask.<br/>
                • On a miss, it’s up to that hunter to decide how badly you offend or annoy them. They mark experience if they decide not to do what you asked.<br/>
                Monsters and minions cannot normally be manipulated.<br/>
            Advanced: On a 12+ they must act under pressure to resist your request. If they do what you ask, they mark one experience and take +1 ongoing while doing what you asked.<br/>
            </h3>
        </div>
        <div>
            <h2>Act Under Pressure</h2>
            <h3>
            When you act under pressure, roll +Cool.<br/>
                On a 10+ you do what you set out to.<br/>
                On a 7-9 the Keeper is going to give you a worse outcome, hard choice, or price to pay.<br/>
            Advanced: On a 12+ you may choose to either do what you wanted and something extra,<br/>
                or to do what you wanted to absolute perfection.<br/>
            </h3><br/>
            <h2>Help Out</h2>
            <h3>
            When you help another hunter, roll +Cool.<br/>
                On a 10+ your help grants them +1 to their roll.<br/>
                On a 7-9 your help grants them +1 to their roll, but you also expose yourself to trouble or danger.<br/>
            Advanced: On a 12+ your help lets them act as if they just rolled a 12, regardless of what they actually got.<br/>
            </h3>
        </div>
        <div>
            <h2>Investigate a Mystery</h2>
            <h3>
            When you investigate a mystery, roll +Sharp. On a 10+ hold 2, and on a 7-9 hold 1. One hold can be spent to ask the Keeper one of the following questions:<br/>
                • What happened here?<br/>
                • What sort of creature is it?<br/>
                • What can it do?<br/>
                • What can hurt it?<br/>
                • Where did it go?<br/>
                • What was it going to do?<br/>
                • What is being concealed here?<br/>
            Advanced: On a 12+, you may ask the Keeper any question you want about the mystery, not just the listed ones.<br/>
            </h3>
        </div>
        <div>
            <h2>Protect Someone</h2>
            <h3>
            When you prevent harm to another character, roll +Tough.<br/>
            On a 7+, you protect them okay, but you’ll suffer some or all of the harm they were going to get.<br/>
            On a 10+ choose an extra:<br/>
                • You suffer little harm (-1 harm).<br/>
                • All impending danger is now focused on you.<br/>
                • You inflict harm on the enemy.<br/>
                • You hold the enemy back.<br/>
            Advanced: on a 12+ both you and the character you are protecting are unharmed and out of danger. If you were protecting a bystander, they also become your ally.<br/>
            </h3><br/>
            </div>
            <div>
            <h2>Read a Bad Situation</h2>
            <h3>
            When you look around and read a bad situation, roll +Sharp.<br/>
            On a 10+ hold 3, and on a 7-9, hold 1.<br/>
                One hold can be spent to ask the Keeper one of the following questions:<br/>
                    • What’s my best way in?<br/>
                    • What’s my best way out?<br/>
                    • Are there any dangers we haven’t noticed?<br/>
                    • What’s the biggest threat?<br/>
                    • What’s most vulnerable to me?<br/>
                    • What’s the best way to protect the victims?<br/>
                If you act on the answers, you get +1 ongoing while the information is relevant.<br/>
            Advanced: On a 12+ you may ask the Keeper any question you want about the situation, not just the listed ones.<br/>
            </h3>
        </div>
        <div>
            <h2>Use Magic</h2>
            <h3>
            When you use magic, say what you’re trying to achieve and how you do the spell, then roll +Weird.<br/>
            On a 10+, the magic works without issues: choose your effect.<br/>
            On a 7-9, it works imperfectly: choose your effect and a glitch. The Keeper will decide what effect the glitch has.<br/>
            Advanced: On a 12+ the Keeper will offer you some added benefit.<br/>
            </h3>
            <h2>Effects</h2>
            <h3>
            • Inflict harm (1-harm ignore-armour magic obvious).<br/>
            • Enchant a weapon. It gets +1 harm and +magic.<br/>
            • Do one thing that is beyond human limitations.<br/>
            • Bar a place or portal to a specific person or a type of creature.<br/>
            • Trap a specific person, minion, or monster.<br/>
            • Banish a spirit or curse from the person, object, or place it inhabits.<br/>
            • Summon a monster into the world.<br/>
            • Communicate with something that you do not share a language with.<br/>
            • Observe another place or time.<br/>
            • Heal 1-harm from an injury, or cure a disease, or neutralize a poison.<br/>
            </h3>
        </div>
        <div>
            <h2>Glitches</h2>
            <h3>
            • The effect is weakened.<br/>
            • The effect is of short duration.<br/>
            • You take 1-harm ignore-armour.<br/>
            • The magic draws immediate, unwelcome attention.<br/>
            • It has a problematic side effect.<br/>
            </h3>
            <h2>The Keeper May Say That...</h2>
            <h3>
            • The spell requires weird materials.<br/>
            • The spell will take 10 seconds, 30 seconds, or 1 minute to cast.<br/>
            • The spell requires ritual chanting and gestures.<br/>
            • The spell requires you to draw arcane symbols.<br/>
            • You need one or two people to help cast the spell.<br/>
            • You need to refer to a tome of magic for the details.<br/>
            </h3>
        </div>
        <div>
            <h2>Big Magic</h2>
            <h3>
            Use this when you want more than the Use Magic effects. Tell the Keeper what you want to do.<br/>
            The Keeper may require:<br/>
                • You need to spend a lot of time (days or weeks) researching the magic ritual.<br/>
                • You need to experiment with the spell – there will be lots of failures before you get it right.<br/>
                • You need some rare and weird ingredients and supplies.<br/>
                • The spell will take a long time (hours or days) to cast.<br/>
                • You need a lot of people (2, 3, 7, 13, or more) to help.<br/>
                • The spell needs to be cast at a particular place and/or time.<br/>
                • You need to use magic as part of the ritual, perhaps to summon a monster, communicate with something, or bar the portal you opened.<br/>
                • It will have a specific side-effect or danger.<br/>
            If you meet the requirements, then the magic takes effect.<br/>
            </h3>
        </div>
        <div>
            <h2>Harm</h2>
            <h3>
            Whenever you suffer harm, the Keeper will tell you what effect it has.<br/>
            Injury severity depends on how much harm you have suffered:<br/>
                • 0-harm wounds have only minor, short term effects.<br/>
                • 4-7 harm wounds are serious and unstable. They will get worse unless treated. Mark the “Unstable” box.<br/>
                • 8-harm or more will kill a normal human, including a hunter.<br/>
            Armour reduces the harm suffered by the number of points it is rated for.<br/>
            Monsters may not be defeated until you use their weakness against them, and this applies to some minions as well.<br/>
            </h3>
            <h2>Recovery</h2>
            <h3>
            • 0 harm wounds are considered healed right away.<br/>
            • 1-3 harm wounds improve when you receive first aid, and later when you rest. Heal 1 when you do.<br/>
            • Unstable wounds require first aid to become stable. While unstable, they may get worse.<br/>
            • 4+ harm wounds require a healing move, time in an infirmary or hospital, or magical healing.<br/>
            At the end of the mystery, you also have a chance to heal.<br/>
            • If there is no chance to rest, heal 1 harm.<br/>
            • If there is plenty of time, heal all harm.<br/>
            </h3>
        </div>
        <div>
            <h2>Luck</h2>
            <h3>
            When you spend a point of Luck, pick one:<br/>
            • Decrease a wound you have suffered to 0 harm.<br/>
            • After you roll, retroactively change the result to a 12.<br/>
            When you have no luck left, bad things will happen to you.<br/>
            </h3>
            <h2>Leveling Up</h2>
            <h3>
            Mark an experience point whenever your roll totals six or less, or when a move tells you to.<br/>
            Whenever you mark the fifth experience box, level up. Erase all five marks and choose an improvement from your list.<br/>
            After you have levelled up five times, you may choose from the advanced improvement list as well.<br/>
            </h3>
            </div>
            <div>
            <h2>End of Session</h2>
            <h3>
            At the end of each session, the Keeper will ask the following questions:<br/>
                • Did we conclude the current mystery?<br/>
                • Did we save someone from certain death (or worse)?<br/>
                • Did we learn something new and important about the world?<br/>
                • Did we learn something new and important about one of the hunters?<br/>
            If you get one or two “Yes” answers, mark one experience. If you get three or four, mark two.<br/>
            </h3>
        </div>
      </div>
      </div>
    );
  };