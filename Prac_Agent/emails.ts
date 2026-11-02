export interface Email {
    from: string
    date: string
    subject: string
    content: string
}

export const emails: Email[] = [
    {
        from: "Maya Patel <maya.patel@example.com>",
        date: "2026-10-26 09:14",
        subject: "Left earbud stopped working",
        content: `Hi,

I bought the Wireless Earbuds Pro on 2 October (order ORD-1001). The left earbud stopped working after about two weeks. It just goes silent in the middle of a song. I would like a refund please.

Thanks,
Maya`
    },
    {
        from: "David Kim <david.kim@example.com>",
        date: "2026-10-26 11:02",
        subject: "Where is my refund?",
        content: `Hello,

I returned the desk lamp from order ORD-1008 and was told I would get my money back. I can't see anything on my statement yet. Can you tell me what is going on?

David Kim`
    },
    {
        from: "Elena Rossi <elena.rossi@example.com>",
        date: "2026-10-27 08:41",
        subject: "Rusty skillet, refund or I'm done",
        content: `To whom it may concern,

The cast iron skillet from order ORD-1011 arrived with rust spots on the inside. For 54 dollars I expect better. I want a full refund. If this is not sorted out I will cancel my account and take my business elsewhere.

Elena Rossi`
    },
    {
        from: "Chloe Martin <chloe.martin@example.com>",
        date: "2026-10-27 14:20",
        subject: "Blanket is the wrong colour",
        content: `Hi there,

The wool throw blanket I ordered (ORD-1015) looks much darker than the photo on your site. I would like to send it back and get my money back. How do I do that?

Chloe`
    },
    {
        from: "Lena Fischer <lena.fischer@example.com>",
        date: "2026-10-28 07:55",
        subject: "Please cancel my chair order",
        content: `Hello,

I placed order ORD-1003 for the office chair yesterday but I have changed my mind. Please cancel it and refund me. I haven't received anything yet.

Lena Fischer`
    },
    {
        from: "James Okafor <james.okafor@example.com>",
        date: "2026-10-28 10:30",
        subject: "Charged twice for my order",
        content: `Hi,

I just checked my bank app and I was charged 24.50 twice for order ORD-1002. Please reverse the extra charge as soon as possible.

James`
    },
    {
        from: "Priya Nair <priya.nair@example.com>",
        date: "2026-10-28 16:12",
        subject: "Order cancelled but I was charged",
        content: `Hello,

My order ORD-1005 for the yoga mat shows as cancelled, but 34.00 has still left my account. I never asked to cancel it. Please sort this out.

Priya Nair`
    },
    {
        from: "Raj Singh <raj.singh@example.com>",
        date: "2026-10-27 19:05",
        subject: "Return request for baby monitor",
        content: `Hi,

We ended up buying a different baby monitor from another shop. I would like to return the one from order ORD-1014 and get a refund. It has been used once. Can you let me know what to do?

Thanks,
Raj`
    },
    {
        from: "Aisha Rahman <aisha.rahman@example.com>",
        date: "2026-10-29 06:48",
        subject: "Ordered the wrong size",
        content: `Hello,

I ordered running shoes (ORD-1007) in size 8 and I should have chosen size 9. They haven't arrived yet. Can I refund this order and place a new one?

Aisha`
    },
    {
        from: "Carlos Mendez <carlos.mendez@example.com>",
        date: "2026-10-29 09:30",
        subject: "Speaker refund",
        content: `Hi,

I bought a Bluetooth speaker on 18 September, order ORD-1004. The sound has been crackling at higher volumes since the first week. I know it has been a while but I would like my money back.

Carlos Mendez`
    },
    {
        from: "James Okafor <james.okafor@example.com>",
        date: "2026-10-27 12:10",
        subject: "Where is my water bottle?",
        content: `Hi,

Order ORD-1002 says shipped but I haven't had any update since. Where is it now?

James`
    },
    {
        from: "Hannah Weiss <hannah.weiss@example.com>",
        date: "2026-10-29 08:05",
        subject: "Need keyboard by the weekend",
        content: `Hello,

I ordered a mechanical keyboard yesterday (ORD-1013). It is a gift and I need it by this weekend. Can you guarantee it will get here by then?

Hannah`
    },
    {
        from: "Aisha Rahman <aisha.rahman@example.com>",
        date: "2026-10-28 13:44",
        subject: "Mi pedido no ha llegado",
        content: `Hola,

Hice un pedido de zapatillas hace una semana (ORD-1007) y todavia no llega. Pueden decirme donde esta?

Gracias,
Aisha`
    },
    {
        from: "Marcus Lee <marcus.lee@example.com>",
        date: "2026-10-29 07:20",
        subject: "Charged but order says payment failed",
        content: `Hi,

I ordered the noise-cancelling headphones yesterday (ORD-1010). My bank shows a 249.00 charge, but the order page says payment failed. Did my order go through or not?

Marcus Lee`
    },
    {
        from: "Omar Haddad <omar.haddad@example.com>",
        date: "2026-10-29 10:15",
        subject: "Air fryer still not here",
        content: `Hello,

My air fryer (ORD-1012) was shipped on the 20th and there is still nothing at my door. This is ridiculous. If it doesn't turn up soon I will cancel and buy from another retailer.

Omar`
    },
    {
        from: "Sophie Dubois <sophie.dubois@example.com>",
        date: "2026-10-27 15:33",
        subject: "Can you confirm delivery?",
        content: `Hi,

I need written confirmation that order ORD-1009 was delivered. It is for an expense report at work. Can you send me something?

Sophie Dubois`
    },
    {
        from: "Raj Singh <raj.singh@example.com>",
        date: "2026-10-26 20:18",
        subject: "Camera keeps disconnecting",
        content: `Hi,

The baby monitor camera from ORD-1014 keeps dropping off the Wi-Fi every few hours. I have restarted it and moved the router closer. Same problem. Is there a fix?

Raj`
    },
    {
        from: "Tom Brennan <tom.brennan@example.com>",
        date: "2026-10-27 06:59",
        subject: "Kettle sparked and smells burnt",
        content: `Hello,

This morning my new kettle (ORD-1006) gave off sparks from the base when I switched it on, and there is a burning smell. I have unplugged it. I'm worried about using it again.

Tom Brennan`
    },
    {
        from: "Sophie Dubois <sophie.dubois@example.com>",
        date: "2026-10-28 21:07",
        subject: "Charger gets dangerously hot",
        content: `Hi,

The portable phone charger from ORD-1009 gets very hot while charging and the case looks slightly swollen. I stopped using it. Should I be worried?

Sophie`
    },
    {
        from: "Omar Haddad <omar.haddad@example.com>",
        date: "2026-10-29 11:40",
        subject: "Coating flaking off",
        content: `Hello,

Not about delivery this time. A friend borrowed the same model and says the non-stick coating inside the air fryer basket is flaking into food. I want to know if this is a known problem.

Omar`
    }
]
