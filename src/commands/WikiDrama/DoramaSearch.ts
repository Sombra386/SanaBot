import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, UserError, type CommandOptions } from '@sapphire/framework';
import { MessageEmbed, type CommandInteraction, type Message } from 'discord.js';

import { DoramaSearch } from '../../lib/doramaSearch';

@ApplyOptions<CommandOptions>({
  name: 'buscar-drama',
  aliases: ['drama-search', 'dorama-search'],
  description: 'Busca un drama o película en varias fuentes a la vez.',
  chatInputApplicationOptions: {
    options: [
      {
        name: 'busqueda',
        description: 'Lo que quieres buscar.',
        type: 'STRING',
        required: true
      }
    ]
  }
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args): Promise<Message> {
    try {
      const query = await args.rest('string');
      const embed = await this.buildEmbed(query);

      return message.reply({
        embeds: [ embed ]
      });
    } catch (err) {
      if (err instanceof UserError) {
        return message.reply('Debes indicar algo para buscar.');
      } else return message.reply('Algo salió mal :(');
    }
  }

  public async chatInputApplicationRun(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply();
    const query = interaction.options.getString('busqueda', true);
    const embed = await this.buildEmbed(query);

    void interaction.editReply({
      embeds: [ embed ]
    });
  }

  public async buildEmbed(query: string): Promise<MessageEmbed> {
    const embed = new MessageEmbed();

    embed
      .setColor('AQUA')
      .setDescription('🔎 Busqué por toda la web y encontré esto:\n(Un 💵 junto al nombre de un sitio indica que es un sitio de pago)');

    const results = await DoramaSearch.unifiedSearch(query);

    for (const site of results) {
      const provider = `${site.provider}${site.isPaid ? ' 💵' : ''}`;

      if (site.status === 'fulfilled') {
        const results = site.value;
        if (results.length > 0) {
          embed.addField(provider, results.map(result => `• [${result.title}](${result.url})`).join('\n'));

        } else {
          embed.addField(provider, '🏷️ No hay resultados.');
        }
      } else {
        embed.addField(provider, `❌ Error: ${site.reason.message}`);
      }
    }

    return embed;
  }
}
