<x-mail::message>
# New Message from Portfolio Guest

You received a new message via the Contact Form on your portfolio.

**Sender Details:**
- **Name:** {{ $senderName }}
- **Email:** [{{ $senderEmail }}](mailto:{{ $senderEmail }})

**Message:**
> {{ $messageBody }}

<x-mail::button :url="config('app.url')">
View Portfolio
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
