import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Texture, TextureLoader, Vector2 } from 'three';
import { ContactSection } from '../sections/ContactSection';
import { contactChannels } from '../data/contactChannels';
import { profile } from '../data/profile';
import { createSectionSculpture } from '../lib/graphics/sectionSculptures';

afterEach(() => vi.restoreAllMocks());

describe('conversation network', () => {
  it('uses only the three requested contact channels with their real destinations', () => {
    render(<ContactSection />);
    const links = within(screen.getByRole('navigation', { name: 'Conversation channels' }));
    expect(links.getAllByRole('link')).toHaveLength(3);
    expect(links.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', profile.github);
    expect(links.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', profile.linkedIn);
    expect(links.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:' + profile.email,
    );
    expect(screen.queryByText('WhatsApp')).not.toBeInTheDocument();
    expect(screen.queryByText('Telegram')).not.toBeInTheDocument();
  });

  it('renders three conversation nodes rather than the skills category and remains static with reduced motion', () => {
    const load = vi.spyOn(TextureLoader.prototype, 'load').mockImplementation(() => new Texture());
    const environment = new Texture();
    const network = createSectionSculpture('contact', environment);
    const nodes = network.scene.children.filter((object) =>
      object.name.startsWith('technology-node-'),
    );
    expect(nodes.map((node) => node.userData.technology)).toEqual(['GitHub', 'Email', 'LinkedIn']);
    expect(load).toHaveBeenCalledTimes(3);
    contactChannels.forEach((channel) =>
      expect(load).toHaveBeenCalledWith(channel.icons[0], expect.any(Function)),
    );
    network.update(0, new Vector2(), true);
    const before = nodes.map((node) => node.position.toArray());
    network.update(100, new Vector2(1, 1), true);
    expect(nodes.map((node) => node.position.toArray())).toEqual(before);
    network.dispose();
    environment.dispose();
  });
});
