import { useState, useMemo } from 'react';
import { useCharacters } from '../../hooks/useCharacters';
import type { GameData } from '../../types';
import gameData from '../../data/game-data.json';
import { MaterialIcon } from '../MaterialIcon';
import {
  getClassIcon,
  getElementIcon,
  getCharacterPortrait,
} from '../../lib/materialIcons';
import { Badge } from '../ui/Badge';
import { Search, Shield, Check, UserCheck, X } from 'lucide-react';

export const CharacterSelector = () => {
  const {
    selectedCharacters,
    toggleCharacter,
    toggleWEngine,
    isCharacterSelected,
    hasWEngine,
    clearSelection,
  } = useCharacters();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  const data = gameData as GameData;

  const filteredCharacters = useMemo(() => {
    return data.characters.filter((char) => {
      const matchesSearch =
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.element.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClass = selectedClass === 'all' || char.class === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [data.characters, searchQuery, selectedClass]);

  return (
    <div className="bg-zzz-surface rounded-sm border border-zzz-border overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-3.5 border-b border-zzz-border-subtle bg-black/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zzz-accent uppercase tracking-widest font-semibold">
              // DIRECTORY
            </span>
            <h2 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              Agents
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="accent" size="xs">
              {selectedCharacters.length} SELECTED
            </Badge>
            {selectedCharacters.length > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-[11px] font-mono text-zzz-text-muted hover:text-zzz-danger transition-colors underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mt-2">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zzz-text-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents, class, element..."
            className="w-full pl-8 pr-7 py-1.5 bg-black/40 border border-zzz-border-subtle rounded-sm text-xs text-white placeholder-zzz-text-muted zzz-focus-ring font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zzz-text-muted hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Class Filter Chips */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 mt-2 scrollbar-none text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setSelectedClass('all')}
            className={`px-2 py-0.5 rounded-sm uppercase whitespace-nowrap transition-colors ${
              selectedClass === 'all'
                ? 'bg-zzz-accent text-black font-bold'
                : 'bg-white/5 text-zzz-text-muted hover:text-white'
            }`}
          >
            All
          </button>
          {data.classes.map((cls) => (
            <button
              key={cls}
              type="button"
              onClick={() => setSelectedClass(selectedClass === cls ? 'all' : cls)}
              className={`px-1.5 py-0.5 rounded-sm uppercase whitespace-nowrap flex items-center gap-1 transition-colors ${
                selectedClass === cls
                  ? 'bg-zzz-accent text-black font-bold'
                  : 'bg-white/5 text-zzz-text-muted hover:text-white'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Characters List */}
      <div className="p-2 sm:p-2.5 space-y-2 max-h-[calc(100vh-280px)] xl:max-h-[750px] overflow-y-auto">
        {filteredCharacters.length === 0 ? (
          <div className="p-6 text-center text-zzz-text-muted font-mono text-xs">
            NO AGENTS MATCHING QUERY
          </div>
        ) : (
          filteredCharacters.map((character) => {
            const isSelected = isCharacterSelected(character.id);
            const wEngineActive = hasWEngine(character.id);
            const classIcon = getClassIcon(character.class);
            const elementIcon = getElementIcon(character.element);

            return (
              <div
                key={character.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleCharacter(character.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCharacter(character.id);
                  }
                }}
                className={`w-full text-left rounded-sm border transition-all duration-150 p-2.5 cursor-pointer relative select-none zzz-focus-ring ${
                  isSelected
                    ? 'bg-zzz-surface-raised border-zzz-accent shadow-md shadow-zzz-accent/5'
                    : 'bg-black/25 border-zzz-border-subtle hover:bg-zzz-surface-hover hover:border-zzz-border'
                }`}
              >
                {/* Active Indicator Bar on Left */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-zzz-accent rounded-l-sm" />
                )}

                <div className="flex gap-2.5 items-center">
                  {/* Portrait Thumbnail */}
                  <div className="relative w-11 h-11 rounded-sm overflow-hidden bg-black/60 border border-zzz-border-subtle shrink-0">
                    <MaterialIcon
                      src={getCharacterPortrait(character.id)}
                      alt={character.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-4 h-4 bg-zzz-accent text-black flex items-center justify-center rounded-bl-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Character Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3
                        className={`font-display text-sm font-bold truncate uppercase tracking-wide ${
                          isSelected ? 'text-white' : 'text-zzz-text-secondary'
                        }`}
                      >
                        {character.name}
                      </h3>
                      {isSelected && (
                        <UserCheck className="w-3.5 h-3.5 text-zzz-accent shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-zzz-text-muted mt-0.5">
                      <span className="flex items-center gap-0.5 truncate">
                        {classIcon && (
                          <MaterialIcon src={classIcon} alt={character.class} size="xs" />
                        )}
                        {character.class}
                      </span>
                      <span>/</span>
                      <span className="flex items-center gap-0.5 truncate">
                        {elementIcon && (
                          <MaterialIcon src={elementIcon} alt={character.element} size="xs" />
                        )}
                        {character.element}
                      </span>
                    </div>
                  </div>
                </div>

                {/* W-Engine Controls when selected */}
                {isSelected && (
                  <div
                    className="mt-2 pt-2 border-t border-zzz-border-subtle flex items-center justify-between"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label className="flex items-center gap-1.5 text-[11px] font-mono text-zzz-text-secondary hover:text-white cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={wEngineActive}
                        onChange={() => toggleWEngine(character.id)}
                        className="w-3.5 h-3.5 rounded bg-black/60 border-zzz-border-subtle text-zzz-accent focus:ring-zzz-accent accent-zzz-accent"
                      />
                      <span>Track W-Engine</span>
                    </label>

                    {wEngineActive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zzz-secondary font-semibold">
                        <Shield className="w-3 h-3" />
                        ACTIVE
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
