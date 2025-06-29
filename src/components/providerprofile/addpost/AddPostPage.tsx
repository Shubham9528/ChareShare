import React, { useState, useRef } from 'react';
import { ArrowLeft, Image, FileText, MapPin, Users, Share, Plus, X, Camera, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UploadedMedia {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

export const AddPostPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<'media' | 'articles'>('media');
  const [caption, setCaption] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Healthcare']);
  const [location, setLocation] = useState('');
  const [taggedPeople, setTaggedPeople] = useState<string[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showTagPeopleInput, setShowTagPeopleInput] = useState(false);
  const [showSharePlatforms, setShowSharePlatforms] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const categories = ['Healthcare', 'Mental Health', 'Wellness', 'Medical'];

  const handleBack = () => {
    navigate('/provider');
  };

  const handlePost = () => {
    if (selectedType === 'media' && !caption.trim() && uploadedMedia.length === 0) {
      alert('Please add some content or media to your post');
      return;
    }

    if (selectedType === 'articles' && (!articleTitle.trim() || !articleContent.trim())) {
      alert('Please add a title and content for your article');
      return;
    }

    const postData = {
      type: selectedType,
      caption: caption.trim(),
      articleTitle: articleTitle.trim(),
      articleContent: articleContent.trim(),
      categories: selectedCategories,
      location: location.trim(),
      taggedPeople,
      media: uploadedMedia.map(m => ({ type: m.type, name: m.file.name })),
      timestamp: new Date().toISOString()
    };

    console.log('Posting:', postData);
    
    // Simulate successful post
    alert('Post created successfully!');
    navigate('/provider');
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newMedia: UploadedMedia = {
            id: Date.now().toString() + Math.random(),
            file,
            preview: e.target?.result as string,
            type: file.type.startsWith('image/') ? 'image' : 'video'
          };
          setUploadedMedia(prev => [...prev, newMedia]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    event.target.value = '';
  };

  const removeMedia = (id: string) => {
    setUploadedMedia(prev => prev.filter(m => m.id !== id));
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setSelectedCategories(prev => [...prev, newCategory.trim()]);
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  const handleAddTaggedPerson = () => {
    if (tagInput.trim() && !taggedPeople.includes(tagInput.trim())) {
      setTaggedPeople(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTaggedPerson = (person: string) => {
    setTaggedPeople(prev => prev.filter(p => p !== person));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-900">
            New Post
          </h1>
          
          <button
            onClick={handlePost}
            disabled={(selectedType === 'media' && !caption.trim() && uploadedMedia.length === 0) || 
                     (selectedType === 'articles' && (!articleTitle.trim() || !articleContent.trim()))}
            className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-200 focus:outline-none ${
              (selectedType === 'media' && (caption.trim() || uploadedMedia.length > 0)) || 
              (selectedType === 'articles' && articleTitle.trim() && articleContent.trim())
                ? 'text-blue-600 hover:bg-blue-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            Post
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 pb-24">
        {/* Media Upload Area */}
        <div className="bg-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] relative">
          {uploadedMedia.length > 0 ? (
            <div className="w-full">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {uploadedMedia.map((media) => (
                  <div key={media.id} className="relative group">
                    {media.type === 'image' ? (
                      <img
                        src={media.preview}
                        alt="Uploaded"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={media.preview}
                        className="w-full h-32 object-cover rounded-lg"
                        controls
                      />
                    )}
                    <button
                      onClick={() => removeMedia(media.id)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleFileUpload}
                className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors duration-200"
              >
                Add more media
              </button>
            </div>
          ) : (
            <>
              <div className="w-32 h-32 bg-gray-300 rounded-2xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <Image className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <div className="w-8 h-8 bg-gray-400 rounded-full mx-auto mb-1"></div>
                  <div className="flex space-x-1">
                    <div className="w-6 h-4 bg-gray-400 rounded"></div>
                    <div className="w-8 h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Media Type Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedType('media');
                    handleFileUpload();
                  }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    selectedType === 'media'
                      ? 'text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  style={selectedType === 'media' ? {
                    background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
                  } : {}}
                >
                  <Image className="w-5 h-5" />
                  <span>Media</span>
                </button>

                <button
                  onClick={() => setSelectedType('articles')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    selectedType === 'articles'
                      ? 'text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  style={selectedType === 'articles' ? {
                    background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
                  } : {}}
                >
                  <FileText className="w-5 h-5" />
                  <span>Articles</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Article Title Input - Only shown when Articles is selected */}
        {selectedType === 'articles' && (
          <div className="space-y-2">
            <input
              type="text"
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              placeholder="Article Title..."
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder-gray-400 text-lg"
            />
            <div className="border-b border-gray-200"></div>
          </div>
        )}

        {/* Caption/Article Content Input */}
        <div className="space-y-2">
          <textarea
            value={selectedType === 'articles' ? articleContent : caption}
            onChange={(e) => selectedType === 'articles' ? setArticleContent(e.target.value) : setCaption(e.target.value)}
            placeholder={selectedType === 'articles' ? "Write your article content..." : "Write a caption..."}
            rows={selectedType === 'articles' ? 6 : 3}
            className="w-full p-4 border-0 focus:outline-none text-gray-600 placeholder-gray-400 resize-none text-lg bg-transparent"
          />
          <div className="border-b border-gray-200"></div>
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}

            {/* Add Category Button */}
            {showAddCategory ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category"
                  className="px-3 py-2 rounded-full text-sm border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={handleAddCategory}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowAddCategory(false)}
                  className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddCategory(true)}
                className="px-4 py-2 rounded-full text-sm font-medium border-2 border-dashed border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          {/* Add Location */}
          <div className="w-full">
            {showLocationInput ? (
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Add location</span>
                  </div>
                  <button
                    onClick={() => setShowLocationInput(false)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            ) : (
              <button 
                onClick={() => setShowLocationInput(true)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Add location</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Tag People */}
          <div className="w-full">
            {showTagPeopleInput ? (
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Tag people</span>
                  </div>
                  <button
                    onClick={() => setShowTagPeopleInput(false)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter name..."
                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddTaggedPerson}
                    disabled={!tagInput.trim()}
                    className={`p-3 rounded-xl ${
                      tagInput.trim() 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    } transition-colors duration-200`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                {taggedPeople.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {taggedPeople.map((person) => (
                      <div 
                        key={person}
                        className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      >
                        <span>{person}</span>
                        <button
                          onClick={() => removeTaggedPerson(person)}
                          className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-blue-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setShowTagPeopleInput(true)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Tag people</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Share to Other Platforms */}
          <div className="w-full">
            {showSharePlatforms ? (
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Share className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Share to other platforms</span>
                  </div>
                  <button
                    onClick={() => setShowSharePlatforms(false)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((platform) => (
                    <label key={platform} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowSharePlatforms(true)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Share className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Share to other platforms</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};